import * as net from "node:net";
import Heartbeats from "./core/heartbeat/heartbeats";
import * as http2 from "node:http2";
import * as fs from "node:fs";

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

    /**
     * @description Configurations for the server.
     * @private
     */
    private readonly serverConfigurations: {
        http2: {
            key: Buffer,
            cert: Buffer,
            port: number,
        },
        socket: {
            host: string,
            port: number,
        }
    }

    constructor(config: any) {
        this.debug = config.debug;
        this.heartbeats = config.heartbeats;

        this.serverConfigurations = {
            http2: {
                key: fs.readFileSync(config.http2Certificate.key),
                cert: fs.readFileSync(config.http2Certificate.cert),
                port: config.http2Port,
            },
            socket: {
                host: config.socketHost,
                port: config.socketPort,
            }
        }
    }


    /**
     * @description start the server
     */
    public start() {
        this.heartbeats.start();

        // HTTPS 2 server
        //
        const http2Server = http2.createSecureServer(this.serverConfigurations.http2);
        http2Server.on('error', (err) => {
            throw err;
        });

        http2Server.on('stream', (stream, headers) => {
            // stream is a Duplex
            stream.respond({
                'content-type': 'application/json',
                ':status': 200
            });
            stream.end(JSON.stringify({hello: 'world'}));

            // close the stream
            stream.close();
        });

        http2Server.listen(1338, () => {
            console.log(`Server started on port ${this.serverConfigurations.http2.port}`);
        });


        // Socket Server
        //
        const socketServer = net.createServer((socket) => {
            socket.write('Echo server\r\n');
            socket.pipe(socket);
            socket.end();
        });

        socketServer.on('error', (err) => {
            throw err;
        });

        socketServer.listen(this.serverConfigurations.socket.port, this.serverConfigurations.socket.host, () => {
            console.log(`Server started on ${this.serverConfigurations.socket.host}:${this.serverConfigurations.socket.port}`);
        });
    }

}
