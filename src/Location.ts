import {Point} from "@turf/helpers";
import Sensor from "./Sensor";

export default class Location {
    // Database id.
    id: number;

    // Id of the reference trajectory for this one.
    trajectory: number;

    // Geometry of the location.
    loc: Point;

    // Time when this location was received.
    timestamp: Date;

    // Id of the system that provided this location.
    source: Sensor;

    // Floor information.
    floor: number;


    public static fromDatabase(data: any): Location {
        data.loc = JSON.parse(data.loc);
        return new Location(data);
    }

    public static fromAPI(data: any): Location {
        return new Location(data);
    }

    private constructor( data: any ) {
        this.id = data.id;
        this.trajectory = data.trajectory;
        this.loc = data.loc;
        this.timestamp = data.timestamp;
        this.source = data.source;
        this.floor = data.floor;
    }
}
