export class YtQueuedTracksVm {
    constructor(message?: string, result?: boolean) {
        if (message)
            this.message = message;
        if (result)
            this.result = result;
        this.queuedTracks = [];
    }
    message: string;
    result: boolean;
    queuedTracks: string[];
}