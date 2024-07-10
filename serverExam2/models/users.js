const dbPromise = require('../db/database');

async function createUser(username, password, isAdmin = false) {
  const db = await dbPromise;
  await db.run('INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)', [username, password, isAdmin]);
}

async function getUserByUsername(username) {
  const db = await dbPromise;
  return db.get('SELECT * FROM users WHERE username = ?', [username]);
}

async function getUserById(id) {
  const db = await dbPromise;
  return db.get('SELECT * FROM users WHERE id = ?', [id]);
}

module.exports = {
  createUser,
  getUserByUsername,
  getUserById
};
