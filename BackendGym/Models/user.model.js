import db from "./db.js"

const registerUser = (username, email, password, callback) => {
  const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
  db.execute(query, [username, email, password], callback);
};

const getUserByUsername = (username, callback) => {
  const query = "SELECT * FROM users WHERE username = ?";
  db.execute(query, [username], callback);
};

module.exports = { registerUser, getUserByUsername };
