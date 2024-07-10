const express = require('express');
const { defineBudget, getDefinedBudget } = require('../controllers/budgetController');
const { isAdmin } = require('../middlewares/auth');

const router = express.Router();

router.post('/', isAdmin, defineBudget);
router.get('/', getDefinedBudget);

module.exports = router;
