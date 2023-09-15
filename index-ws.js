const express = require('express');
const server = require('http').createServer();
const app = express();

app.get('/', function(req, res) {
    res.sendFile('index.html', {root: __dirname});
});

server.on('request', app);
server.listen(3000, function() { console.log('Server started on port 3000');});

/* BEGIN: Websocket code*/

const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({server: server});

wss.on('connection', function connection(ws) {
    const numClients = wss.clients.size;
    console.log('Clients connected: ', numClients);

    wss.broadcast(`Current clients: ${numClients}`);
    if(ws.readyState === ws.OPEN) {
        ws.send('Welcome to agg server!');
    }
    ws.on('close', function close() {
        wss.broadcast(`Current clients: ${numClients}`);
        console.log('A client has disconnected');
    });


});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each (client) {
        client.send(data);
    })
}