const dbPromise = require('../db/database');

async function createProposal(userId, description, cost) {
  const db = await dbPromise;
  await db.run('INSERT INTO proposals (user_id, description, cost) VALUES (?, ?, ?)', [userId, description, cost]);
}

async function getProposalsByUserId(userId) {
  const db = await dbPromise;
  return db.all('SELECT * FROM proposals WHERE user_id = ?', [userId]);
}

async function getAllProposals() {
  const db = await dbPromise;
  return db.all('SELECT * FROM proposals');
}

async function deleteProposal(id) {
  const db = await dbPromise;
  await db.run('DELETE FROM proposals WHERE id = ?', [id]);
}

module.exports = {
  createProposal,
  getProposalsByUserId,
  getAllProposals,
  deleteProposal
};
