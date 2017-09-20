// var io = require('socket.io')
const socket = io.connect('http://61e83bf3.ngrok.io');


let message = document.getElementById('message'),
  handle = document.getElementById('handle'),
  btn = document.getElementById('send'),
  output = document.getElementById('output');


btn.addEventListener('click', () => {
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    })
});


socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>';
});
