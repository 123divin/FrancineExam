const dbPromise = require('../db/database');

async function setBudget(amount) {
  const db = await dbPromise;
  await db.run('INSERT INTO budget (amount) VALUES (?)', [amount]);
}

async function getBudget() {
  const db = await dbPromise;
  return db.get('SELECT amount FROM budget ORDER BY id DESC LIMIT 1');
}

module.exports = {
  setBudget,
  getBudget
};
