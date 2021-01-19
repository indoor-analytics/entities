/**
 * Defines a run point.
 */
export default interface IGeoJSONPoint {
    type: 'Feature';
    geometry: {
        type: 'Point',
        coordinates: number[]
    };
    properties: {
        id: string;
        reference: string;                  // belongs to a reference path
        position: number;                   // order of the point into the path
        floor: number;

        color?: string;
        displayAverageError?: boolean;
        averageErrorColor?: string;
        time?: string;                      // date (ISO-8601) when the location is registered by SensorThings
        checkpoint?: any;                   // matches a reference path checkpoint
    }
}
