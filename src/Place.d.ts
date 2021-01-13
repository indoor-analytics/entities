import { Feature, Polygon } from "@turf/helpers";
/**
 * Represents a physical place, to which are associated reference paths.
 * The VenueId links it to the Mapwize place entity.
 */
export default class Place {
    id: number;
    name: string;
    description: string;
    address: string;
    venueId: string;
    indoorLocationApiKeys: {
        [keyId: string]: string;
    };
    geometry: Feature<Polygon>;
    center: {
        lng: number;
        lat: number;
    };
    constructor(id: number, name: string, description: string, address: string, venueId: string, indoorLocationApiKeys: {
        [keyId: string]: string;
    }, geometry: Feature<Polygon>, center: {
        lng: number;
        lat: number;
    });
    static fromSensorThings(body: any): Place;
    static fromAPI(body: any): Place;
}
