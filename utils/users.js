// Create temporary database
const users = [];

// Add user to array (temporary db)
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

// Get current user obj from array by passing unique socket id
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}

// Delete user from array  by passing unique socket id
function userLeaves(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}

// Return all users in particular room (filtered by roomName)
function getRoomUsers(room) {
  return users.filter((user) => user.room === room);
}

// Export
module.exports = {
  userJoin,
  getCurrentUser,
  userLeaves,
  getRoomUsers,
};
