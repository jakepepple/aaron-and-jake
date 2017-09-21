<template>
    <div id="chat-box">
        <div id="chat-window">
            <div id="output"></div>
            <div id="feedback"></div>
        </div>
        <input id="handle" type="text" placeholder="Handle">
        <input id="message" type="text" placeholder="Message">
        <button id="send">Send</button>
    </div>
</template>


<script>
// Imports
export default {
    data() {
        return {

        }
    },
    mounted() {
        const socket = io.connect('http://61e83bf3.ngrok.io');


        let message = document.getElementById('message');
        let handle = document.getElementById('handle');
        let btn = document.getElementById('send');
        let output = document.getElementById('output');
        let feedback = document.getElementById('feedback');


        btn.addEventListener('click', () => {
            socket.emit('chat', {
                message: message.value,
                handle: handle.value,
            });
        });

        message.addEventListener('keypress', () => {
            socket.emit('typing', handle.value);
        });


        socket.on('chat', (data) => {
            feedback.innerHTML = '';
            output.innerHTML += `<p><strong>${data.handle}:</strong>${data.message}</p>`;
        });


        socket.on('typing', (data) => {
            feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>'
        });
    }
}





</script>

<style scoped>
h2 {
    font-size: 18px;
    padding: 10px 20px;
    color: #575ed8;
}

#chat-box {
    max-width: 600px;
    margin: 30px auto;
    border: 1px solid #ddd;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.05);
    border-radius: 2px;
}

#chat-window {
    height: 400px;
    overflow: auto;
    background: #f9f9f9;
}

#output p {
    padding: 14px 0px;
    margin: 0 20px;
    border-bottom: 1px solid #e9e9e9;
    color: #555;
}

#feedback p {
    color: #aaa;
    padding: 14px 0px;
    margin: 0 20px;
}

#output strong {
    color: #575ed8;
}

label {
    box-sizing: border-box;
    display: block;
    padding: 10px 20px;
}

input {
    padding: 10px 20px;
    box-sizing: border-box;
    background: #eee;
    border: 0;
    display: block;
    width: 100%;
    background: #fff;
    border-bottom: 1px solid #eee;
    font-family: Nunito;
    font-size: 16px;
}

button {
    background: #575ed8;
    color: #fff;
    font-size: 18px;
    border: 0;
    padding: 12px 0;
    width: 100%;
    border-radius: 0 0 2px 2px;
}
</style>