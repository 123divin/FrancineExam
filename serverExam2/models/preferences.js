const dbPromise = require('../db/database');

async function createPreference(userId, proposalId, score) {
  const db = await dbPromise;
  await db.run('INSERT INTO preferences (user_id, proposal_id, score) VALUES (?, ?, ?)', [userId, proposalId, score]);
}

async function getPreferencesByUserId(userId) {
  const db = await dbPromise;
  return db.all('SELECT * FROM preferences WHERE user_id = ?', [userId]);
}

async function getAllPreferences() {
  const db = await dbPromise;
  return db.all('SELECT * FROM preferences');
}

async function updatePreference(userId, proposalId, score) {
  const db = await dbPromise;
  await db.run('UPDATE preferences SET score = ? WHERE user_id = ? AND proposal_id = ?', [score, userId, proposalId]);
}

module.exports = {
  createPreference,
  getPreferencesByUserId,
  getAllPreferences,
  updatePreference
};
