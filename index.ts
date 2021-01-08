import {AxiosResponse} from "axios";
import {Feature, Polygon} from "@turf/helpers";
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

    constructor (rawData: AxiosResponse['data']) {
        this.id = rawData['id'];
        this.name = rawData['name'];
        this.description = rawData['description'];
        this.address = '';
        this.venueId = rawData['venueId'];
        this.indoorLocationApiKeys = {};
        this.geometry = polygon([]);
        this.center = {lng: 0, lat: 0};
    }
}
