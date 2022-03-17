export default class Run {
    // Database id.
    id: number;

    // Name of the run.
    name: string;

    // Id of the reference trajectory for the run.
    reference: number;

    // Model name of the device that created the run.
    device_model: string;

    // Operating system name of the device that created the run.
    os: string;

    // Operating system version of the device that created the run.
    os_version: string;

    // Package version of the mobile application that created the run.
    package_version: string;

    // Start time of the run.
    time_start: Date;

    // End time of the run.
    time_end: Date | null;

    // IP address of the device that created the run.
    ip_address: string;

    // MAC address of the device that created the run.
    mac_address: string;

    // Comment written by the user who realized the run.
    // This is only accessible when a run is over.
    comment: string | null;

    // Array of timestamps stored by mobile application when user reached a reference path checkpoint.
    checkpoints_timestamps: number[] | null | undefined;


    private static get trajectoryFields(): string[] {
        return [ 'id', 'name', 'reference' ];
    }

    private static get trajectoryMetadataFields(): string[] {
        return [
            'device_model', 'os', 'os_version', 'package_version',
            'ip_address', 'mac_address', 'comment',
            'checkpoints_timestamps', 'time_start', 'time_end'
        ];
    }

    public static get entityFields(): string[] {
        const tFields = Run.trajectoryFields.map(f => 'trajectory.'+f);
        const tmFields = Run.trajectoryMetadataFields.map(f => 'trajectory_metadata.'+f);
        return [...tFields, ...tmFields];
    }

    static fromDatabase(data: any): Run {
        for (const tField of [...Run.trajectoryFields, ...Run.trajectoryMetadataFields])
            if (data[tField] === undefined)
                throw new Error(`Missing argument: ${tField}.`);

        return new Run(data);
    }

    static fromAPI(data: any): Run {
        return new Run(data);
    }

    private constructor( data: any ) {
        this.id = data.id;
        this.name = data.name;
        this.reference = data.reference;
        this.device_model = data.device_model;
        this.os = data.os;
        this.os_version = data.os_version;
        this.package_version = data.package_version;
        this.time_start = data.time_start;
        this.time_end = data.time_end;
        this.ip_address = data.ip_address;
        this.mac_address = data.mac_address;
        this.comment = data.comment;

        // timestamps are stored as bigint on database, which is automatically
        // converted to string by JavaScript; this converts them back to numbers
        if (data.checkpoints_timestamps)
            this.checkpoints_timestamps = data.checkpoints_timestamps.map((x: any) => +x);
    }
}
