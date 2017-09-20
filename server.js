const express = require('express');
require('dotenv').config();
var socket = require('socket.io');
const app = express();

app.get('/', (req, res) => {
  res.send('hello world');
});

const port = process.env.PORT;

var server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

var io = socket(server);

io.on('connection', function(socket){
  console.log('Connection', socket.id)

  socket.on('chat', function(data){
    io.sockets.emit('chat', data);

  });
});