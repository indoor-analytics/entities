/**
 * Contains all information defining an error about a location while analysing a path.
 * It represents distance between:
 *     * a location acquired by an indoor positioning system;
 *     * a position on the reference path which the previous location would equal, if the IPS was perfect.
 */
export default class ErrorVector {
    index: number;
    acquisitionTime: string;
    distance: number;
    projectedDistance: number;
    acquiredPoint: number[];
    projectedPoint: number[];
    constructor(index: number, acquiredPoint: number[], projectedPoint: number[], distance: number, projectedDistance: number, time?: string);
    static fromAPI(raw: any): ErrorVector;
}
