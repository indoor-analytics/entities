import {Feature, FeatureCollection, lineString, LineString, Point} from "@turf/helpers";

export default class ReferencePath {
    // Database id.
    id: number;

    // Name of the reference path.
    name: string;

    // Geometry of the reference path.
    path: FeatureCollection<Point, {floor: number}>;

    // Indications for people walking along path.
    indications: string[];


    private constructor( data: any ) {
        this.id = data.id;
        this.name = data.name;
        this.path = data.path;
        this.indications = data.indications;
    }

    public static fromDatabase(data: any): ReferencePath {
        data.path = JSON.parse(data.path);
        return new ReferencePath( data );
    }

    public static fromAPI(data: any): ReferencePath {
        return new ReferencePath( data );
    }


    /**
     * Return the current path as a set of [lng, lat] coordinates.
     */
    toCoordinates (): number[][] {
        return this.path.features.map(point => point.geometry.coordinates);
    }

    /**
     * Returns the current object as a GeoJSON LineString object.
     * Throws an error if the path doesn't contain at least two positions.
     */
    toLineString (): Feature<LineString> {
        if (this.path.features.length <= 1)
            throw new RangeError("A LineString must contain at least two positions.");
        return lineString(this.toCoordinates());
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
        for (const point of this.path.features) {
            const floor = point.properties.floor;
            if (!floors.includes(floor)) {
                floors.push(floor);
            }
        }
        return floors;
    }
}
