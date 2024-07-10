const { createPreference, getPreferencesByUserId, getAllPreferences, updatePreference } = require('../models/preferences');

async function submitPreference(req, res) {
  const { userId, proposalId, score } = req.body;
  await createPreference(userId, proposalId, score);
  res.sendStatus(201);
}

async function getUserPreferences(req, res) {
  const { userId } = req.params;
  const preferences = await getPreferencesByUserId(userId);
  res.json(preferences);
}

async function getAllUserPreferences(req, res) {
  const preferences = await getAllPreferences();
  res.json(preferences);
}

async function updateUserPreference(req, res) {
  const { userId, proposalId, score } = req.body;
  await updatePreference(userId, proposalId, score);
  res.sendStatus(200);
}

module.exports = {
  submitPreference,
  getUserPreferences,
  getAllUserPreferences,
  updateUserPreference
};
