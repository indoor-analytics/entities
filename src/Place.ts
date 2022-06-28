import {Point, Polygon} from "@turf/helpers";

export default class Place {
    // Mapwize identifier of the place.
    venue_id: string;

    // Name of the place.
    name: string;

    // Description of the place.
    description: string;

    // Address of the place.
    address: string;

    // Geometry of the place.
    geometry: Polygon;

    // Center of the place.
    center: Point;

    // Object holding indoor-positioning-systems access keys.
    ips_keys: JSON;


    private constructor (data: any) {
        this.venue_id = data.venue_id;
        this.name = data.name;
        this.description = data.description;
        this.address = data.address;
        this.ips_keys = data.ips_keys;
        this.geometry = data.geometry;
        this.center = data.center;
    }

    public static fromAPI(data: any): Place {
        return new Place(data);
    }

    public static fromDatabase(data: any): Place {
        data.geometry = JSON.parse(data.geometry);
        data.center = JSON.parse(data.center);
        return new Place(data);
    }
}
