var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );
var mongo = require('server/mongodb')


var app = express();
var server = http.createServer( app );
var io = socket.listen( server );


io.sockets.on('connection', function (socket) {
    console.log('inside');

    socket.on('message', function (user, cb) {
        mongo.createUser(user);
    });

});



server.listen( 8081 );