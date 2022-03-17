export default class Run {
    id: number;
    name: string;
    reference: number;
    device_model: string;
    os: string;
    os_version: string;
    package_version: string;
    time_start: Date;
    time_end: Date | null;
    ip_address: string;
    mac_address: string;
    comment: string | null;
    checkpoints_timestamps: number[] | null | undefined;
    private static get trajectoryFields();
    private static get trajectoryMetadataFields();
    static get entityFields(): string[];
    static fromDatabase(data: any): Run;
    static fromAPI(data: any): Run;
    private constructor();
}
