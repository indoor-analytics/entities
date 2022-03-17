import {LineString} from "@turf/helpers";

export default class ReferencePath {
    // Database id.
    id: number;

    // Name of the reference path.
    name: string;

    // Geometry of the reference path.
    path: LineString;


    private constructor( data: any ) {
        this.id = data.id;
        this.name = data.name;
        this.path = data.path;
    }

    public static fromDatabase(data: any): ReferencePath {
        data.path = JSON.parse(data.path);
        return new ReferencePath( data );
    }

    public static fromAPI(data: any): ReferencePath {
        return new ReferencePath( data );
    }
}
