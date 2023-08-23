const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let counter = 0;

app.use(express.static(path.join(__dirname, './dist')));

app.post('/increment', (req, res) => {
  counter++;

  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(counter.toString());
    }
  });

  res.send(counter.toString());
});

wss.on('connection', (socket) => {
  socket.send(counter.toString());
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
