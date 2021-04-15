'use strict';

const options = {
  transports: ['websocket'],
};
const socket = io('localhost:3000/', options);
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
// get Room and players
socket.on('roomPlayers', ({ room, users }) => {
  outputRoomName(room);
  output(users);
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

function outputRoomName(room) {
  let roomDiv = document.getElementById('rooms');
  let h4 = document.createElement('h4');
  h4.innerText = room;
  roomDiv.appendChild(h4);
}

function output(users) {
  let ul = document.getElementById('players');
  users.forEach((user) => {
    let li = document.createElement('li');
    li.innerText = user.username;
    ul.appendChild(li);
  });
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
