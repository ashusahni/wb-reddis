const http = require('http');
const WebSocket = require('ws');
const { WebSocketServer } = WebSocket;

const server = http.createServer();

const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws:any) {
    console.log((new Date()) + ' Client connected');

    ws.on('error', (err:any) => {
        console.error((new Date()) + ' WebSocket error:', err);
    });

    ws.on('message', function message(data:any, isBinary:any) {
        console.log((new Date()) + ' Received message:', data.toString());
        wss.clients.forEach(function each(client:any) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data, { binary: isBinary });
            }
        });
    });

    ws.on('close', () => {
        console.log((new Date()) + ' Client disconnected');
    });

    ws.send('This message is from the server');
});

server.listen(8000, () => {
    console.log((new Date()) + ' Server is up listening to port 8000');
});