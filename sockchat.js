var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path')

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendfile('views/sockchat.html');
});


users = 0

io.on('connection', function(socket){
    users += 1
    console.log('a user connected');
    io.emit('status message', 'Someone joined! Users: ' + users)
    socket.on('disconnect', function(){
	users -= 1
        console.log('a user disconnected.');
        io.emit('status message', 'Someone left... Users: ' + users)
    });
    socket.on('chat message', function(msg, name){
	if (name == '') {
        io.emit('chat message', msg);
	}	
	else {
        io.emit('chat message', name + ': ' + msg);
	}
    });
});

http.listen(80, function(){
      console.log('listening on *:80');
});


