'use strict';

const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require('./utils/users');

const skribbleBot = 'Skribble Bot';
const PORT = 3000 || process.env.PORT;
// set Static folder
app.use(express.static(path.join(__dirname, 'public')));

function onConnection(socket) {
  socket.on('drawing', (data) => {
    socket.emit('drawing', data);
  });
}

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);
    // welcome current player
    onConnection(socket);
    socket.emit(
      'message',
      formatMessage(skribbleBot, 'Welcome to Skribble Game')
    );
    // broadcast to other playes that someone join
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(skribbleBot, `${user.username} has joined the game`)
      );
  });
  onConnection(socket);
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });
});
server.listen(PORT, () => {
  console.log('server is running or PORT: ', PORT);
});
