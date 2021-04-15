'use strict';

const socket = io();
const chatForm = document.getElementById('chatForm');
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join the Game
socket.emit('joinRoom', { username, room });
socket.on('message', (message) => {
  console.log('__msg__', message);
  outputMessage(message);
});

// functoins
function outputMessage(message) {
  const div = document.createElement('div');
  // you can add class here for the div
  const p = document.createElement('p');
  p.innerText = message.username;
  p.innerHTML += `<span>${message.time}</span>`;
  div.appendChild(p);
  const para = document.createElement('p');
  para.innerText = message.text;
  div.appendChild(para);
  document.querySelector('.txtArea').appendChild(div);
}

// events
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get Guessed word
  let msg = e.target.elements.msg.value;
  msg = msg.trim();
  if (!msg) {
    return false;
  }
  console.log('__chatmessage___', msg);
  //Emit the msg to server
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});
