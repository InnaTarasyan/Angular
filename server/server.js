var socket = require( 'socket.io' );
var express = require( 'express' );
var http = require( 'http' );
var mongo = require('server/mongodb');
var User = require('server/models/user').User;


var app = express();
var server = http.createServer( app );
var io = socket.listen( server );


io.sockets.on('connection', function (socket) {
    console.log('inside');

    socket.on('message', function (user, cb) {
        mongo.createUser(user);
    });

    socket.on('message', function (user, cb) {
        mongo.createUser(user);
    });

    socket.on('login', function (user, cb) {
        User.authorize('dd@yandex.hru', 'supervasyadnd', function(err, user) {
            if (err) {
                console.log(err);
            }
            console.log('Logged In');

        });


    });

});



server.listen( 8081 );