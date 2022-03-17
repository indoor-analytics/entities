import { Point } from "@turf/helpers";
export default class Location {
    id: number;
    trajectory: number;
    loc: Point;
    timestamp: Date;
    source: number;
    floor: number;
    static fromDatabase(data: any): Location;
    static fromAPI(data: any): Location;
    private constructor();
}
