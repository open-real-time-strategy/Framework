import Beat from "./beat";

export default class Heartbeats {
    private beats: Beat[] = [];

    constructor(beats: Beat[]) {
        this.beats = beats;
    }

    public start() {
        this.beats.forEach((beat) => {
            beat.start();
        });
    }

    public stop() {
        this.beats.forEach((beat) => {
            beat.stop();
        });
    }

}