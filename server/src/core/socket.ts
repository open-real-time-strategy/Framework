import * as net from "node:net";

export default class Socket {
    private readonly config: {
        host: string,
        port: number,
    }

    constructor(config: {
        host: string,
        port: number,
    }) {
        this.config = config;
    }

    public start(): void
    {
        const socketServer = net.createServer((socket) => {
            socket.write('Echo server\r\n');
            socket.pipe(socket);
            socket.end();
        });

        socketServer.on('error', (err) => {
            throw err;
        });

        socketServer.listen(this.config.port, this.config.host, () => {
            console.log(`Server started on ${this.config.host}:${this.config.port}`);
        });
        }
}