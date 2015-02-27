#!/usr/bin/env node

var express = require('express');
var http = require('http');
var websocket = require('websocket').server;

var app = express();

var port = process.env.PORT || '3000';
app.set('port', port);

var server = http.createServer(app);
server.listen(port);

function log(msg){
  console.log((new Date()) + ' ' + msg);
}

server.on('listening', function(){
  log("Listeing port " + port);
  log("In your browser open http://127.0.0.1:" + port);
});

// Create Websocket Serve
var wsServer = new websocket({
  httpServer: server,

  // You should not use autoAcceptConnections for production
  // applications, as it defeats all standard cross-origin protection
  // facilities built into the protocol and the browser.  You should
  // *always* verify the connection's origin and decide whether or not
  // to accept it.
  autoAcceptConnections: false
});

wsServer.on('request', function(request) {
  var connection = request.accept('echo-protocol', request.origin);

  log('Connection accepted.');

  connection.on('message', function(message) {

    if (message.type === 'utf8') {
      log('Received Message: ' + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    }

  });

  connection.on('close', function(reasonCode, description) {
    log('Peer '+ connection.remoteAddress + ' disconnected.');
  });
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client.html');
});
