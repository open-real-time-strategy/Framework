import Heartbeats from "./core/heartbeat/heartbeats";
import * as fs from "node:fs";
import Http2 from "./core/http2";
import Socket from "./core/socket";

export default class Server {

    /**
     * @description Heartbeats are things that are called at a regular interval.
     * @type {Heartbeats}
     */
    public readonly heartbeats: Heartbeats;

    /**
     * @description Flag to enable or disable debug mode.
     * @private
     */
    public readonly debug: boolean;

    private readonly http2: Http2;
    private readonly socket: Socket;

    constructor(config: any) {
        this.debug = config.debug;
        this.heartbeats = config.heartbeats;

        this.http2 = new Http2({
            key: fs.readFileSync(config.http2Certificate.key),
            cert: fs.readFileSync(config.http2Certificate.cert),
            port: config.http2Port,
        });
        this.socket = new Socket({
            host: config.socketHost,
            port: config.socketPort,
        });
    }

    /**
     * @description start the server
     */
    public start(): void
    {
        this.heartbeats.start();

        this.http2.start();
        this.socket.start();
    }

}
