import { LineString } from "@turf/helpers";
export default class ReferencePath {
    id: number;
    name: string;
    path: LineString;
    private constructor();
    static fromDatabase(data: any): ReferencePath;
    static fromAPI(data: any): ReferencePath;
}
