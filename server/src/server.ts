// import * as net from "node:net";
import Heartbeats from "./core/heartbeat/heartbeats";

export default class Server {

    public readonly debug: boolean;

    /**
     * @description Heartbeats are things that are called at a regular interval.
     */
    public readonly heartbeats: Heartbeats;

    constructor(config: any) {
        this.debug = config.debug;
        this.heartbeats = config.heartbeats;
    }

    /**
     * @description start the server
     */
    public start() {
        this.heartbeats.start();
    }
    //     const server = net.createServer((socket) => {
    //         socket.write("Echo server\r\n");
    //         socket.pipe(socket);
    //     });
    //
    //     server.listen(this.port, this.host, () => {
    //         console.log(`Server running at http://${this.host}:${this.port}/`);
    //     });
    // }
}