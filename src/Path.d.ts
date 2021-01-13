import { Feature, LineString } from "@turf/helpers/lib/geojson";
import IGeoJSONPoint from "./IGeoJSONPoint";
/**
 * A set of coordinates representing a movement in space.
 */
export default class Path {
    id: number;
    name: string;
    distance: number;
    points: IGeoJSONPoint[];
    isReferencePath: boolean;
    colorCode: string;
    runs: number[];
    constructor(name: string, points: IGeoJSONPoint[], isReferencePath?: boolean, dbId?: number, runs?: number[], colorCode?: string);
    /**
     * Return the current path as a set of [lng, lat] coordinates.
     */
    toCoordinates(): number[][];
    /**
     * Returns the current object as a GeoJSON LineString object.
     */
    toLineString(): Feature<LineString>;
    /**
     * Clones the current path while removing references (values-only copy).
     */
    clone(): Path;
    /**
     * Returns a unique identifier for this path.
     */
    getSourceName(): string;
    /**
     * Returns an array containing all floor numbers concerned by this path.
     */
    getFloors(): number[];
}
