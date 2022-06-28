import { Point } from "@turf/helpers";
import Sensor from "./Sensor";
export default class Location {
    id: number;
    trajectory: number;
    loc: Point;
    timestamp: Date;
    source: Sensor;
    floor: number;
    static fromDatabase(data: any): Location;
    static fromAPI(data: any): Location;
    private constructor();
}
