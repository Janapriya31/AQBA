const express = require('express');
const router = express.Router();
const { generateQuestionBank } = require('../controllers/questionBankController');

// Generate Question Bank Route
router.post('/generate', generateQuestionBank);

module.exports = router;
