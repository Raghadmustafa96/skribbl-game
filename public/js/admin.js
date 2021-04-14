const options = {
  transports: ["websocket"],
};
const socket = io("localhost:3030", options);
formEl.addEventListener("submit", handleSubmit);

socket.on("connect", () => {
  console.log("player connected");
  const lobby = socket.id;
  // emitting to the server
  socket.emit("join", { room: "lobby" });

  // listing to the newTicket event that was generated from the server
  socket.emit("getall");
  socket.emit("all");

  socket.on("createName", (payload) => {
    //3a
    render(payload);
  });

  // socket.on("offlineStaff", (payload) => {
  //   const el = document.getElementById(payload.id);
  //   el.remove();
  // });
});
function handleSubmit(e) {
  e.preventDefault();
  const payload = {
    name: e.target.name.value,
  };
  console.log(payload.name);
  socket.emit("createName", payload);
}
socket.emit("newPlayer", (payload) => {
  console.log(socket.id);
});
socket.on("playerJoin", (player) => {});
function render(payload) {
  const form = document.getElementById("formEl");
  const container = document.getElementById("tickets");
  const articleEl = document.createElement("article");
  container.prepend(articleEl);
  articleEl.classList.add("ticket");
  const h2El = document.createElement("h2");
  articleEl.appendChild(h2El);
  h2El.textContent = `${payload}`;
  const p1El = document.createElement("p");
  articleEl.append(p1El);
  form.style.display = "none";
}
