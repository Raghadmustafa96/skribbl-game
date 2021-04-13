'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http);
io.listen(server);

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));

let currentRoom;
const queue = {
  staff: [],
};


app.get('/', (req, res) => {
  res.render('index');
});

app.get('/loby',(req,res)=>{
  res.render('loby');
})

io.on('connection', (socket) => {
  console.log('a user Connected', socket.id);


  socket.on('join', (payload) => {

    currentRoom = payload.room;
    socket.join(currentRoom);
    const data = { name: payload.name, id: socket.id };
    queue.staff.push(data);
    socket.in(currentRoom).emit('onlineStaff', data);
  });

  
  socket.on('getall', () => {
    // console.log(queue);
    queue.staff.forEach((staff) => {
      socket.emit('onlineStaff', { name: staff.name });
    });
  });

  socket.on('disconnect', () => {
    socket.to(currentRoom).emit('offlineStaff', { id: socket.id });
    queue.staff = queue.staff.filter((s) => s.id !== socket.id);
  });
});























module.exports = {
  server,
  app,
  io,
};
