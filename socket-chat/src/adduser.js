var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendfile('adduser.html');
});

users = [];
io.on('connection', function (socket) {
    console.log('A user connected');

    socket.on('setUsername', function (data) {
        if (users.indexOf(data) == -1) {
            users.push(data);
            socket.emit('userSet', { username: data });
        } else {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        }
    });

    socket.on('msg', function (data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })

    socket.on('typing', function (data) {
        io.sockets.emit('showTyping', data);
    })

});

http.listen(3000, function () {
    console.log('listening on localhost:3000');
});