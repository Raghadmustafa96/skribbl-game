'use strict';

<<<<<<< HEAD
const PORT = process.env.PORT || 3030;
=======
const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
>>>>>>> 79cd559dea629134a9b80b7aa0719242ed313775

const PORT = 3000 || process.env.PORT;
// set Static folder
app.use(express.static(path.join(__dirname, 'public')));

function onConnection(socket) {
  socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);
server.listen(PORT, () => {
  console.log('server is running or PORT: ', PORT);
});
