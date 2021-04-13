'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http);
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(cors());
app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.render('index');
});

server.listen(PORT, () => console.log('Listening on PORT ' + PORT));
