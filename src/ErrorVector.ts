/**
 * Contains all information defining an error about a location while analysing a path.
 * It represents distance between:
 *     * a location acquired by an indoor positioning system;
 *     * a position on the reference path which the previous location would equal, if the IPS was perfect.
 */
export default class ErrorVector {
    public index: number;               // index of the acquired position
    public acquisitionTime: string;     // time when location has been acquired by a geolocation system
    public distance: number;            // distance between an acquired location and its projection on the reference path
    public projectedDistance: number;   // distance from the origin of the reference path to the projected location

    public acquiredPoint: number[];     // location reported by the localisation system
    public projectedPoint: number[];    // projection of the acquired location on the reference path

    constructor(index: number, acquiredPoint: number[], projectedPoint: number[], distance: number, projectedDistance: number, time: string = '') {
        this.distance = distance;
        this.index = index;
        this.acquiredPoint = acquiredPoint;
        this.projectedPoint = projectedPoint;
        this.projectedDistance = projectedDistance;
        this.acquisitionTime = time;
    }

    static fromAPI (raw: any): ErrorVector {
        return new ErrorVector(
            raw['index'],
            raw['acquiredPoint'],
            raw['projectedPoint'],
            raw['distance'],
            raw['projectedDistance'],
            raw['acquisitionTime']
        );
    }
}
