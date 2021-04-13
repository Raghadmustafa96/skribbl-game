'use strict';

const express = require('express');
const cors = require('cors');
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(http);

const { v4: uuidv4 } = require('uuid');


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log('Listening on PORT ' + PORT));