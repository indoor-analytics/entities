import length from "@turf/length";
import {Feature, LineString} from "@turf/helpers/lib/geojson";
import {lineString} from "@turf/helpers";
import IGeoJSONPoint from "./IGeoJSONPoint";

/**
 * A set of coordinates representing a movement in space.
 */
export default class Path {
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
            points.length > 1 ?
                +(length(this.toLineString()) * 1000) : // converting distance to metres
                0;
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
        if (this.points.length <= 1)
            throw new RangeError("A LineString must contain at least two positions.");
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
