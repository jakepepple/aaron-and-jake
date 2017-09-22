<template>
<div type="text/x-template" id="modal-template">
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">
              default header
            </slot>
          </div>

          <div class="modal-body">
            <slot name="body">
              <div id="chat-box">
        <div id="chat-window">
            <div id="output"></div>
            <div id="feedback"></div>
        </div>
        <input id="handle" type="text" placeholder="Handle">
        <input id="message" type="text" placeholder="Message">
        <button id="send">Send</button>
    </div>
            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button class="modal-default-button" @click="$emit('close')">
                Close chat
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
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


.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>