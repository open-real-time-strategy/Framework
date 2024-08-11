import Heart from "./heart";

export default class Beat {
    private interval: any;

    public beat: number = 0;
    public readonly rate: number = 100;
    public readonly hearts: Heart[];


    constructor(hearts: Heart[], rate: number = 100) {
        this.hearts = hearts;
        this.rate = rate;
    }

    public start() {
        this.interval = setInterval(() => {
            for (let i = 0; i < this.hearts.length; i++) {
                this.hearts[i].pulse();
            }
            this.beat++;
        }, this.rate);
    }

    public stop() {
        clearInterval(this.interval);
    }
}