var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );


var app = express();
var server = http.createServer( app );
var io = socket.listen( server );


io.sockets.on('connection', function (socket) {
    console.log('inside');

    socket.on('message', function (text, cb) {
        console.log(text);
       // socket.broadcast.emit('message', text);
        //cb("123");
    });

});



server.listen( 8081 );