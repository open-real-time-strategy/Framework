import Beat from "./beat";

export default class Heart {
    callbacks: Function[] = [];

    constructor(callbacks: Function[]) {
        this.callbacks = callbacks;
    }

    public pulse() {
        for (let i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i]();
        }
    }
}