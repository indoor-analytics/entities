import { Point, Polygon } from "@turf/helpers";
export default class Place {
    venue_id: string;
    name: string;
    description: string;
    address: string;
    geometry: Polygon;
    center: Point;
    ips_keys: JSON;
    private constructor();
    static fromAPI(data: any): Place;
    static fromDatabase(data: any): Place;
}
