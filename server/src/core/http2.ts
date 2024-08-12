import * as http2 from "node:http2";

export default class Http2 {
    private readonly config: {
        key: Buffer,
        cert: Buffer,
        port: number,
    }

    constructor(config: {
        key: Buffer,
        cert: Buffer,
        port: number,
    }) {
        this.config = config;
    }

    public start(): void
    {
        const http2Server = http2.createSecureServer(this.config);
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
            console.log(`Server started on port ${this.config.port}`);
        });
    }
}