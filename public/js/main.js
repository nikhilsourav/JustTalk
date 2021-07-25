/*
  .
  .
  ===================== DOM setup ====================== //
  .
  .
*/
// select dom elements
const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')

// Extract userName and roomName from index page
const {username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

/*
  .
  .
  ===================== socket ====================== //
  .
  .
*/
// init socket
const socket = io();

/*
  1. JoinRoom event with userName and roomName being sent from frontend
  SENT
*/
socket.emit('Join Room', {username, room});

/*
  2. Receive current room and list of all users in this room and print them in DOM
  RECEIVED
*/
socket.on('roomUsers', ({room, users}) => {
  outputRoomName(room);
  outputUsers(users);
})

/*
  3. Send message typed by user under chatMessage event (msg is string)
  SENT
*/
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // extract message text
  const msg = e.target.elements.msg.value;

  // send message to server
  socket.emit("chatMessage", msg);

  // clear inputs
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus() = '';

});

/*
  4. Receive message from server and broadcast in this room to everyone
  SENT
*/
socket.on("message", (message) => {
  // print message to dom
  outputMessage(message);

  // scroll down to last message
  chatMessages.scrollTop = chatMessages.scrollHeight;
});




/*
  .
  .
  =============== DOM manipulation utility fn =============== //
  .
  .
*/
// Output message to DOM
function outputMessage(message) {

  // create brand new div
  const div = document.createElement("div");

  // add new class for css purpose
  div.classList.add("message");

  // modify the text content of this new div
  div.innerHTML = 
  `<p class="meta">${message.username} <span>${message.time}</span></p>
   <p class="text">${message.text}</p>`;

  // add this brand new div to messages
  document.querySelector(".chat-messages").appendChild(div);
}

// Display current roomname to DOM (sidebar)
function outputRoomName(room){
  roomName.innerText = room;
}

// Display all users to DOM (sidebar)
function outputUsers(users){
  userList.innerHTML = `${users.map(user => `<li>${user.username}</li>`).join('')}`;
}