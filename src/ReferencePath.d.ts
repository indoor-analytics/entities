import { Feature, FeatureCollection, LineString, Point } from "@turf/helpers";
export default class ReferencePath {
    id: number;
    name: string;
    path: FeatureCollection<Point, {
        floor: number;
    }>;
    private constructor();
    static fromDatabase(data: any): ReferencePath;
    static fromAPI(data: any): ReferencePath;
    /**
     * Return the current path as a set of [lng, lat] coordinates.
     */
    toCoordinates(): number[][];
    /**
     * Returns the current object as a GeoJSON LineString object.
     * Throws an error if the path doesn't contain at least two positions.
     */
    toLineString(): Feature<LineString>;
    /**
     * Returns a unique identifier for this path.
     */
    getSourceName(): string;
    /**
     * Returns an array containing all floor numbers concerned by this path.
     */
    getFloors(): number[];
}
