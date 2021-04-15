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

const queue = {
  staff: [],
};

const skribbleBot = 'Skribble Bot';
const PORT = 3000 || process.env.PORT;
// set Static folder
app.use(express.static(path.join(__dirname, 'public')));

function onConnection(socket, room) {
  socket.on('drawing', (data) => {
    socket.broadcast.to(room).emit('drawing', data);
  });
}

io.on('connection', (socket) => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    const data = { name: username,room: user.room, id: socket.id };
    queue.staff.push(data);

    onConnection(socket);
    // welcome current player
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
    // send players info
    socket.to(user.room).emit('roomPlayers', data);
    // socket.to(user.room).emit('room', data);

    socket.on('getall', () => {
      console.log(queue);
      queue.staff.forEach((staff) => {
        socket.emit('roomPlayers', {name : staff.name , room : staff.room , id : staff.id});
      });
    });

  });

  onConnection(socket, 'room1');
  socket.on('chatMessage', (msg) => {
    const user = getCurrentUser(socket.id);

    socket.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  socket.on('disconnect', () => {
    socket.to('room1').emit('offlineStaff', { id: socket.id });

    const user = userLeave(socket.id);

    queue.staff = queue.staff.filter((s) => s.id !== socket.id);
    console.log(' queue.staff' ,  queue.staff );

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(skribbleBot, `${user.username} has left the Game`)
      );
    }
  });
});

server.listen(PORT, () => {
  console.log('server is running or PORT: ', PORT);
});
