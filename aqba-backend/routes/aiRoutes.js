const express = require('express');
const router = express.Router();
const axios = require('axios'); // For making API requests
const { checkRole } = require('../middleware/roleMiddleware'); // Assuming you have a checkRole middleware
const authenticate = require('../middleware/authenticate'); // Middleware to authenticate API calls

// Controller function to generate question bank
const generateQuestionBank = async (req, res) => {
    const { topic, difficulty } = req.body;

    if (!topic || !difficulty) {
        return res.status(400).json({ error: 'Topic and difficulty level are required' });
    }

    try {
        // Replace with your Gemini API endpoint and key
        const response = await axios.post('https://api.gemini.com/v1/generateQuestions', {
            topic,
            difficulty,
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`, // Your API Key
            }
        });

        const questionBank = response.data; // Adjust based on the API response structure
        res.status(200).json(questionBank);
    } catch (error) {
        console.error('Error generating question bank:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Route for generating question bank with authentication and role checks
router.post('/generate-question-bank', authenticate, checkRole(['Admin', 'Trainer']), generateQuestionBank);

module.exports = router;
