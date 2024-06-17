const express = require('express');
const { initDB } = require('../models/database');

const router = express.Router();

// Middleware to ensure user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

// Start a new game round
router.get('/start', ensureAuthenticated, async (req, res) => {
  const db = await initDB();
  const meme = await db.get('SELECT * FROM memes ORDER BY RANDOM() LIMIT 1');
  const captions = await db.all('SELECT * FROM captions ORDER BY RANDOM() LIMIT 7');
  
  const correctCaptions = await db.all('SELECT caption_id FROM meme_captions WHERE meme_id = ?', meme.id);
  const response = {
    meme,
    captions,
    correctCaptions: correctCaptions.map(c => c.caption_id)
  };
  
  res.json(response);
});

// Submit a caption choice
router.post('/submit', ensureAuthenticated, async (req, res) => {
  const { memeId, selectedCaptionId } = req.body;
  const db = await initDB();
  const correctCaptions = await db.all('SELECT caption_id FROM meme_captions WHERE meme_id = ?', memeId);
  
  const isCorrect = correctCaptions.some(c => c.caption_id === selectedCaptionId);
  const points = isCorrect ? 5 : 0;

  await db.run('INSERT INTO rounds (user_id, meme_id, selected_caption_id, points) VALUES (?, ?, ?, ?)', [
    req.user.id, memeId, selectedCaptionId, points
  ]);

  res.json({ points, correctCaptions });
});

// Get user profile and game history
router.get('/profile', ensureAuthenticated, async (req, res) => {
  const db = await initDB();
  const rounds = await db.all('SELECT * FROM rounds WHERE user_id = ?', req.user.id);

  res.json({ user: req.user, rounds });
});

module.exports = router;
