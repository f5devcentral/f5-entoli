



import { log } from './service'
import net from 'net';


// https://gist.github.com/sid24rane/2b10b8f4b2f814bd0851d861d3515a10


export class ServerSocket {
    socket: net.Server;
    conn: net.Socket | undefined;
    port: number;

    constructor(port: number) {
        this.port = port;
        this.socket = net.createServer()
            .on('connection', conn => {
                log.info('socket connection from client!!!')
                conn.write("Hello! You can start typing. Type 'quit' to end connection.\n");
                conn.setEncoding("utf-8")
                this.conn = conn;
                const buffer: string[] = [] // string buffer for this socket
                conn.on('data', function (data) {
                    buffer.push(data.toString("utf8"))

                    const lines = buffer.join().split("\n") // split buffer into lines of text
                    // buffer = lines[lines.length - 1] // set buffer to the last (incomplete) line
                    // lines = lines.slice(0, -1) // remove the incomplete (last) line from the lines

                    // process all (complete) lines
                    // a complete line is a line with a newline \n character
                    lines.forEach(function (line) {
                        const cmd = line.trim().toLowerCase()
                        log.info('line1', cmd)
                        if (cmd === ",quit") {
                            conn.write("Goodbye!\n");
                            return conn.end();
                        }
                    })
                })
                log.output = function (log) {
                    if (socket?.conn?.destroyed) {
                        socket.conn.write(log)
                    }
                }
            })
            .on('error', x => log.error('socket error', x))
            .on('close', (x: unknown) => log.info('socket close', x))
            .on('listening', (x: unknown) => log.info('socket listening', x))

    }

    listen() {
        this.socket.listen(this.port)
    }

    close() {
        // this.socket.close();
        // this.socket.end();
        if(this.conn) this.conn.destroy();
        this.socket.close();
    }
}


export const socket = new ServerSocket(3001);


// inject vscode output into logger
// logger.output = function (log: string) {
//     f5OutputChannel.appendLine(log);
// };

