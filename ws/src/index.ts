import express, { Request, Response } from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// Optional: Define a count variable if needed globally
let connectionCount = 0;

app.get('/', (req: Request, res: Response) => {
    res.send('WebSocket Server is Running with Express + TypeScript!');
});

wss.on('connection', (ws: WebSocket) => {
    console.log(new Date(), 'Client connected!');
    connectionCount++;

    ws.on('error', (err: Error) => {
        console.error(new Date(), 'WebSocket error:', err);
    });

    ws.on('message', (data: WebSocket.RawData, isBinary: boolean) => {
        console.log(new Date(), 'Received message:', data.toString());

        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.on('close', () => {
        console.log(new Date(), 'Client disconnected!');
    });

    ws.send('This message is from the server');
});

server.listen(8000, () => {
    console.log(new Date(), 'Express + WS server listening on port 8000');
});
