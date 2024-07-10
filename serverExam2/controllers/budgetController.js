const { setBudget, getBudget } = require('../models/budget');

async function defineBudget(req, res) {
  const { amount } = req.body;
  await setBudget(amount);
  res.sendStatus(201);
}

async function getDefinedBudget(req, res) {
  const budget = await getBudget();
  res.json(budget);
}

module.exports = {
  defineBudget,
  getDefinedBudget
};
