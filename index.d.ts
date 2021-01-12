import { Feature, Polygon } from "@turf/helpers/lib/geojson";
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
/**
 * Contains all information defining an error about a location while analysing a path.
 * It represents distance between:
 *     * a location acquired by an indoor positioning system;
 *     * a position on the reference path which the previous location would equal, if the IPS was perfect.
 */
export declare class ErrorVector {
    index: number;
    distance: number;
    projectedDistance: number;
    acquiredPoint: number[];
    projectedPoint: number[];
    constructor(index: number, acquiredPoint: number[], projectedPoint: number[], distance: number, projectedDistance: number);
    static fromAPI(raw: any): ErrorVector;
}
export interface IGeoJSONPoint {
    type: 'Feature';
    geometry: {
        type: 'Point';
        coordinates: number[];
    };
    properties: {
        id: string;
        reference: string;
        position: number;
        floor: number;
        color?: string;
        displayAverageError?: boolean;
        averageErrorColor?: string;
        time?: string;
    };
}
