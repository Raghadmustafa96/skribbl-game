'use strict';

const options = {
  transports: ['websocket'],
};
const socket = io('skribblgame1.herokuapp.com/', options);
const chatForm = document.getElementById('chatForm');
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

// Join the Game
socket.emit('joinRoom', { username, room });

socket.emit('getall');

socket.on('message', (message) => {
  console.log('__msg__', message);
  outputMessage(message);
});

socket.on('room', (data) => {
  outputRoomName(data.room);
});

$('#turn').on('click', (e) => {
  socket.emit('pass_turn');
});
socket.on('hide', (bool) => {
  $('#turn').fadeOut();
});

socket.on('start turn', (data) => {
  console.log(data, 'start turn');
  let word = randomWords();
  socket.emit('word', word);
  $('.word').text(word);
  $('.word').fadeIn();
});

socket.on('end turn', (data) => {
  console.log(data, 'end turn hide the word');
  $('.word').fadeOut();
});

// get Room and players
socket.on('roomPlayers', (data) => {
  output(data);
});

socket.on('offlineStaff', (payload) => {
  const el = document.getElementById(payload.id);
  if (el) {
    el.remove();
  }
});
socket.on('point', (user) => {
  let ul = document.getElementById('players');
  const li = document.getElementById(user.id);
  li.innerText = '';
  li.innerText = user.username + '  ' + user.points + ' Points';
  ul.appendChild(li);
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
  console.log('room number', room);
  roomDiv.appendChild(h4);
}

function output(user) {
  let ul = document.getElementById('players');
  let li = document.createElement('li');
  li.id = user.id;
  li.innerText = user.name + '  ' + user.points + ' Points';
  ul.appendChild(li);
}

// events
chatForm.addEventListener('submit', (e) => {
  console.log('start the game');
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

function randomWords() {
  let myArray = [
    'tea',
    'stickers',
    'candy',
    'computer',
    'keyboard',
    'mouse',
    'cup',
    'bottle',
    'chips',
    'mirror',
    'shadow',
    'photo',
    'horse',
    'cat',
    'dog',
    'unicorn',
    'stairs',
    'ladder',
    'phone',
    'book',
    'hand',
    'football',
    'tennis',
    'snake',
    'singer',
    'desk',
    'cape',
    'hero',
    'fish',
    'dancer',
    'pie',
    'cupcake',
    'teacher',
    'student',
    'star',
    'adult',
    'airplane',
    'apple',
    'pear',
    'peach',
    'baby',
    'backpack',
    'bathtub',
    'bird',
    'button',
    'carrot',
    'chess',
    'circle',
    'clock',
    'clown',
    'coffee',
    'comet',
    'compass',
    'diamond',
    'drums',
    'ears',
    'elephant',
    'feather',
    'fire',
    'garden',
    'gloves',
    'grapes',
    'hammer',
    'highway',
    'spider',
    'kitchen',
    'knife',
    'map',
    'maze',
    'money',
    'rich',
    'needle',
    'onion',
    'painter',
    'perfume',
    'prison',
    'potato',
    'rainbow',
    'record',
    'robot',
    'rocket',
    'rope',
    'sandwich',
    'shower',
    'spoon',
    'sword',
    'teeth',
    'tongue',
    'triangle',
    'umbrella',
    'werewolf',
    'water',
    'window',
    'whistle',
    'flower',
    'boat',
    'rain',
    'soap',
    'suit',
    'egg',
    'monkey',
    'pizza',
    'skirt',
    'cactus',
    'milk',
    'cookie',
    'comb',
    'mask',
    'stick',
    'bat',
    'cloud',
    'sneeze',
    'saw',
    'shoe',
    'butter',
    'bell',
    'sponge',
    'train',
    'mail',
    'thunder',
  ];
  // document.getElementById('words').innerHTML =
  //   myArray[Math.floor(Math.random() * myArray.length)];
  return myArray[Math.floor(Math.random() * myArray.length)];
}
