const express = require('express');
const router = express.Router();
const { generateQuestionBank } = require('../controllers/aiController'); // Import the controller function

// Route for generating question bank
router.post('/api/generate-question-bank', checkRole(['Admin', 'Trainer']), generateQuestionBank);

module.exports = router;
