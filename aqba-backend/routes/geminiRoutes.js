const express = require('express');
const router = express.Router();
const { generateQuestions, generateLearningPlan } = require('../controllers/geminiController');

// Route to generate questions
router.post('/generate-questions', generateQuestions);

// Route to generate a personalized learning plan
router.post('/generate-learning-plan', generateLearningPlan);

module.exports = router;
