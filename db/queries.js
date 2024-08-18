const pool = require("./pool");

async function getMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function getUserById(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return rows[0];
}

async function getUserByUsername(username) {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows[0];
}

async function createUser(firstName, lastName, username, password) {
  await pool.query(
    "INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4)",
    [firstName, lastName, username, password]
  );
}

async function createMessage(title, message, userId) {
  await pool.query(
    "INSERT INTO messages (title, message, user_id) VALUES ($1, $2, $3)",
    [title, message, userId]
  );
}

async function giveUserMember(userId) {
  await pool.query("UPDATE users SET is_member = TRUE, WHERE id = $1", [
    userId,
  ]);
}

async function giveUserAdmin(userId) {
  await pool.query("UPDATE users SET is_admin = TRUE, WHERE id = $1", [userId]);
}

async function deleteMessage(messageId) {
  await pool.query("DELETE FROM messages WHERE id = $1", [messageId]);
}

module.exports = {
  getMessages,
  getUserById,
  getUserByUsername,
  createUser,
  createMessage,
  giveUserMember,
  giveUserAdmin,
  deleteMessage,
};
