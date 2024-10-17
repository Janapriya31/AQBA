const express = require('express');
const router = express.Router();
const { submitFeedback } = require('../controllers/feedbackController');

// Submit Feedback Route
router.post('/submit', submitFeedback);

module.exports = router;
