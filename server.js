"use strict";

var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require('socket.io').listen(server);
var users = [];
var connections = [];

server.listen(process.env.PORT || 3000);
console.log("server running on port 3000..");
//create a route
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

//open connection to socket io 
io.sockets.on('connection', function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected', connections.length);

    ///disconnect 
    socket.on('disconnect', function(data){
        connections.slice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    });

    //send message 
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data});
    });
   
});