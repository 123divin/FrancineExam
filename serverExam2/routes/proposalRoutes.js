const express = require('express');
const { submitProposal, getUserProposals, getAllUserProposals, removeProposal } = require('../controllers/proposalController');
const { ensureAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, submitProposal);
router.get('/:userId', ensureAuthenticated, getUserProposals);
router.get('/', ensureAuthenticated, getAllUserProposals);
router.delete('/:id', ensureAuthenticated, removeProposal);

module.exports = router;
