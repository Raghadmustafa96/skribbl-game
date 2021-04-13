'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
});

module.exports = {
  server,
  app,
  io,
};
