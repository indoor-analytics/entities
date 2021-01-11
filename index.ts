import {Feature, Polygon} from "@turf/helpers/lib/geojson";
import {polygon} from "@turf/helpers";

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
    indoorLocationApiKeys: {[keyId: string]: string};
    geometry: Feature<Polygon>;
    center: {lng: number, lat: number};

    constructor (
        id: number,
        name: string,
        description: string,
        address: string,
        venueId: string,
        indoorLocationApiKeys: {[keyId: string]: string},
        geometry: Feature<Polygon>,
        center: {lng: number, lat: number}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.address = address;
        this.venueId = venueId;
        this.indoorLocationApiKeys = indoorLocationApiKeys;
        this.geometry = geometry;
        this.center = center;
    }

    public static fromSensorThings (body: any): Place {
        return new Place(
            body['@iot.id'],
            body['name'],
            body['description'],
            body['Thing']['description'],
            body['unitOfMeasurement']['definition'],
            body['Thing']['properties']['indoorLocationApiKeys'],
            body['observedArea'],
            body['Thing']['properties']['center'],
        );
    }

    public static fromAPI (body: any): Place {
        return new Place(
            body['id'],
            body['name'],
            body['description'],
            body['address'],
            body['venueId'],
            body['indoorLocationApiKeys'],
            body['geometry'],
            body['center']
        );
    }
}
