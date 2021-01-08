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

    constructor (values: PlaceParameters) {
        this.id = values.id;
        this.name = values.name;
        this.description = values.description;
        this.address = values.address;
        this.venueId = values.venueId;
        this.indoorLocationApiKeys = values.indoorLocationApiKeys;
        this.geometry = values.geometry;
        this.center = values.center;
    }
}

export interface PlaceParameters {
    id: number;
    name: string;
    description: string;
    address: string;
    venueId: string;
    indoorLocationApiKeys: {[keyId: string]: string};
    geometry: Feature<Polygon>;
    center: {lng: number, lat: number};
}
