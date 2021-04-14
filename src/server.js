"use strict";

const express = require("express");
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(http);
const { v4: uuidv4 } = require("uuid");
io.listen(server);

app.set("view engine", "ejs");
app.use(cors());
app.use(express.static("./public"));

let currentRoom;
const player = {};
const player2 = {
  count: [],
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/game", (req, res) => {
  res.render("admin");
});

io.on("connection", (socket) => {
  console.log("a server can see you", socket.id);

  socket.on("join", (payload) => {
    // console.log(player.count.length);
    // currentRoom = payload.room;
    // socket.join(currentRoom);
    // console.log(currentRoom);
    // const data = { id: socket.id };
    // player2.count.push(data);
    // console.log(player2);
  });
  socket.on("all", () => {
    Object.keys(player).forEach((players) => {
      socket.emit("players", "what I am doing here");
    });
  });
  socket.on("createName", (payload) => {
    const name = payload.name;
    socket.emit("createName", name);
    // io.emit(currentRoom).emit("newTicket", { name }); // 3s
  });
  socket.on("newPlayer", (payload) => {
    console.log("new player is here");
    player[socket.id] = payload;
    console.log("players", Object.keys(player).length);
    io.emit("playerJoin", player);
  });
  socket.on("disconnect", () => {
    delete player[socket.id];
    console.log("players left", Object.keys(player).length);
    io.emit("playerJoin", player);
  });

  // socket.on("getall", () => {
  //   player2.count.forEach((data) => {
  //     socket.emit("", { name: data.name });
  //   });
  //   queue.tickets.forEach((ticket) => {
  //     socket.emit("newTicket", ticket);
  //   });
  // });
  // socket.on("disconnect", () => {
  //   socket.to(currentRoom).emit("offlineStaff", { id: socket.id });
  //   queue.staff = queue.staff.filter((s) => s.id !== socket.id);
  // });
});

module.exports = {
  server,
  app,
  io,
};
