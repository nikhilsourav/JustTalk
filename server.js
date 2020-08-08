// setup
const path = require("path");
const http = require("http")
const express = require("express");
const socketio = require("socket.io")
const app = express();
const io = socketio(server)
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// serve static folder
app.use(express.static(path.join(__dirname, "public")));

// run when client connects
io.on('connection', socket => {
    console.log("New ws connection")
})

// Listen on server
server.listen(port, () =>
  console.log("server is up and listening on port " + port)
);
