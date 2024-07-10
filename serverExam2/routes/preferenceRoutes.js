const express = require('express');
const { submitPreference, getUserPreferences, getAllUserPreferences, updateUserPreference } = require('../controllers/preferenceController');
const { ensureAuthenticated } = require('../middlewares/auth');

const router = express.Router();

router.post('/', ensureAuthenticated, submitPreference);
router.get('/:userId', ensureAuthenticated, getUserPreferences);
router.get('/', ensureAuthenticated, getAllUserPreferences);
router.put('/', ensureAuthenticated, updateUserPreference);

module.exports = router;
