// setup
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketio(server);

// serve static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "JustTalk bot";
// run when client connects
io.on("connection", (socket) => {
  console.log("New ws connection...");

  // Welcome current user
  socket.emit(
    "message",
    formatMessage(
      botName,
      "Welcome to JustTalks a website designed and developed by Nikhil"
    )
  );

  // Notify when a user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  );

  // Notify when a user disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user has left the chat"));
  });

  // Listen for chat message
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage('user', msg));
  });
});

// Listen on server
server.listen(port, () =>
  console.log("server is up and listening on port " + port)
);
