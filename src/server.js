'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.Server(app);
const io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/canvas', (req, res) => {
  res.render('canvas');
});

function onConnection(socket) {
  console.log('___socket___', socket.id);
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
  socket.to(socket.id).emit('turn', { message: 'draw' });
}

io.on('connection', onConnection);

module.exports = {
  server,
  app,
  io,
};
