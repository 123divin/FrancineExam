const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { initDB } = require('../models/database');

const router = express.Router();

// Register a new user (for testing purposes)
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const db = await initDB();
  await db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);

  res.status(201).send('User registered');
});

// Login route
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send('Logged in');
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout();
  res.send('Logged out');
});

module.exports = router;
