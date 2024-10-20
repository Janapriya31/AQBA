// routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios'); // For making API requests
const authenticate = require('../middleware/authenticate'); // Import authenticate middleware
const checkRole = require('../middleware/roleMiddleware'); // Import role middleware
const { generateQuestionBank } = require('../controllers/aiController'); // Import the controller function

// AI Task Route: Generate Question Bank (Only accessible by Admin and Trainer roles)
// You can either use the controller method or write the logic directly here (choose one)

// Option 1: Use the controller function
router.post('/api/generate-question-bank', authenticate, checkRole(['Admin', 'Trainer']), generateQuestionBank);

// Option 2: Handle everything inside this route (without controller)
router.post('/generate-question-bank', authenticate, checkRole(['Admin', 'Trainer']), async (req, res) => {
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
});

module.exports = router;
