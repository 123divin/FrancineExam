const { createProposal, getProposalsByUserId, getAllProposals, deleteProposal } = require('../models/proposals');

async function submitProposal(req, res) {
  const { userId, description, cost } = req.body;
  await createProposal(userId, description, cost);
  res.sendStatus(201);
}

async function getUserProposals(req, res) {
  const { userId } = req.params;
  const proposals = await getProposalsByUserId(userId);
  res.json(proposals);
}

async function getAllUserProposals(req, res) {
  const proposals = await getAllProposals();
  res.json(proposals);
}

async function removeProposal(req, res) {
  const { id } = req.params;
  await deleteProposal(id);
  res.sendStatus(204);
}

module.exports = {
  submitProposal,
  getUserProposals,
  getAllUserProposals,
  removeProposal
};
