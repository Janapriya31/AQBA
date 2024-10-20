const express = require('express');
const router = express.Router();
const { generateQuestions } = require('../controllers/questionBankController'); // Make sure the function name matches

// Generate Question Bank Route
router.post('/generate', generateQuestions); // Ensure this matches the exported function name

module.exports = router;
