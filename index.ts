import {Feature, LineString, Polygon} from "@turf/helpers/lib/geojson";
import length from "@turf/length";
import {lineString} from "@turf/helpers";

/**
 * Represents a physical place, to which are associated reference paths.
 * The VenueId links it to the Mapwize place entity.
 */
export class Place {
    id: number;
    name: string;
    description: string;
    address: string;
    venueId: string;
    indoorLocationApiKeys: {[keyId: string]: string};
    geometry: Feature<Polygon>;
    center: {lng: number, lat: number};

    constructor (
        id: number,
        name: string,
        description: string,
        address: string,
        venueId: string,
        indoorLocationApiKeys: {[keyId: string]: string},
        geometry: Feature<Polygon>,
        center: {lng: number, lat: number}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.venueId = venueId;
        this.indoorLocationApiKeys = indoorLocationApiKeys;
        this.geometry = geometry;
        this.center = center;
    }

    public static fromSensorThings (body: any): Place {
        return new Place(
            body['@iot.id'],
            body['name'],
            body['description'],
            body['Thing']['description'],
            body['unitOfMeasurement']['definition'],
            body['Thing']['properties']['indoorLocationApiKeys'],
            body['observedArea'],
            body['Thing']['properties']['center'],
        );
    }

    public static fromAPI (body: any): Place {
        return new Place(
            body['id'],
            body['name'],
            body['description'],
            body['address'],
            body['venueId'],
            body['indoorLocationApiKeys'],
            body['geometry'],
            body['center']
        );
    }
}


/**
 * Contains all information defining an error about a location while analysing a path.
 * It represents distance between:
 *     * a location acquired by an indoor positioning system;
 *     * a position on the reference path which the previous location would equal, if the IPS was perfect.
 */
export class ErrorVector {
    public index: number;               // index of the acquired position
    public distance: number;            // distance between an acquired location and its projection on the reference path
    public projectedDistance: number;   // distance from the origin of the reference path to the projected location

    public acquiredPoint: number[];     // location reported by the localisation system
    public projectedPoint: number[];    // projection of the acquired location on the reference path

    constructor(index: number, acquiredPoint: number[], projectedPoint: number[], distance: number, projectedDistance: number) {
        this.distance = distance;
        this.index = index;
        this.acquiredPoint = acquiredPoint;
        this.projectedPoint = projectedPoint;
        this.projectedDistance = projectedDistance;
    }

    static fromAPI (raw: any): ErrorVector {
        return new ErrorVector(
            raw['index'],
            raw['acquiredPoint'],
            raw['projectedPoint'],
            raw['distance'],
            raw['projectedDistance']
        );
    }
}


/**
 * Defines a run point.
 */
export interface IGeoJSONPoint {
    type: 'Feature';
    geometry: {
        type: 'Point',
        coordinates: number[]
    };
    properties: {
        id: string;
        reference: string;
        position: number;
        floor: number;

        color?: string;
        displayAverageError?: boolean;
        averageErrorColor?: string;
        time?: string;
    }
}


/**
 * A set of coordinates representing a movement in space.
 */
export class Path {
    public id: number;
    public name: string;
    public distance: number;
    public points: IGeoJSONPoint[];
    public isReferencePath: boolean;
    public colorCode: string;
    public runs: number[];

    constructor (name: string, points: IGeoJSONPoint[], isReferencePath: boolean = false,
                 dbId: number = -1, runs: number[] = [], colorCode: string = '#ff0000') {
        this.id = dbId;
        this.name = name;
        this.points = points;
        this.isReferencePath = isReferencePath;
        this.colorCode = colorCode;
        this.distance =
            +(length(this.toLineString()) * 1000) // converting distance to metres
                .toFixed(3);
        try {
            this.runs = runs
        } catch (e) {
            // @ts-ignore
            this.runs = runs;
        }
    }

    /**
     * Return the current path as a set of [lng, lat] coordinates.
     */
    toCoordinates (): number[][] {
        return this.points.map((point: any) => point['geometry']['coordinates']);
    }

    /**
     * Returns the current object as a GeoJSON LineString object.
     */
    toLineString (): Feature<LineString> {
        return lineString(this.toCoordinates());
    }

    /**
     * Clones the current path while removing references (values-only copy).
     */
    clone (): Path {
        return new Path(
            JSON.parse(JSON.stringify(this.name)),
            JSON.parse(JSON.stringify(this.points)),
            JSON.parse(JSON.stringify(this.isReferencePath)),
            JSON.parse(JSON.stringify(this.id)),
            JSON.parse(JSON.stringify(this.runs)),
            JSON.parse(JSON.stringify(this.colorCode))
        );
    }

    /**
     * Returns a unique identifier for this path.
     */
    getSourceName (): string {
        return `path-${this.id}-${this.name}`;
    }

    /**
     * Returns an array containing all floor numbers concerned by this path.
     */
    getFloors (): number[] {
        const floors: number[] = [];
        for (const point of this.points) {
            const floor = point.properties.floor;
            if (!floors.includes(floor)) {
                floors.push(floor);
            }
        }
        return floors;
    }
}
