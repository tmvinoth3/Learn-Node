const express = require('express');
const app = express();
const  http = require('http');
const server  = http.createServer(app);
var io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
      });
})

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

const port = process.env.PORT | 3000;
server.listen(port, () => console.log(`listening to the port ${port}...`));
