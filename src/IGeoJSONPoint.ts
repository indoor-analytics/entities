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
        reference: string;
        position: number;
        floor: number;

        color?: string;
        displayAverageError?: boolean;
        averageErrorColor?: string;
        time?: string;
        checkpoint?: any;
    }
}
