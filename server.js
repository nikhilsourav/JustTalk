// setup
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

// serve static folder
app.use(express.static(path.join(__dirname, "public")));

// run when client connects
io.on("connection", (socket) => {
  console.log("New ws connection...");

  // Welcome current user
  socket.emit("message", "welcome to JustTalk");

  // Notify when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");
  
  // Notify when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  })

  // Listen for chat message
  socket.on('chatMessage', msg => {
    io.emit('message', msg)
  })
});

// Listen on server
server.listen(port, () =>
  console.log("server is up and listening on port " + port)
);
