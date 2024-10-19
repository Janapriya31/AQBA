const axios = require('axios'); // Import axios for making API requests
require('dotenv').config(); // Load environment variables from .env

// Function to generate questions based on the curriculum
exports.generateQuestions = async (req, res) => {
    const { technology, topics } = req.body; // Get the technology and topics from the request body

    try {
        // Make a request to the Gemini API to generate questions
        const response = await axios.post('https://gemini-api-endpoint/question-generation', {
            technology,
            topics
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` // Add your API key in the headers
            }
        });

        // Send the generated questions back to the client
        res.json({
            message: 'Questions generated successfully!',
            questions: response.data.questions
        });
    } catch (error) {
        console.error('Error generating questions:', error);
        res.status(500).json({ error: 'Failed to generate questions' });
    }
};

// Function to generate a personalized learning plan
exports.generateLearningPlan = async (req, res) => {
    const { technology, topics } = req.body;

    try {
        // Make a request to the Gemini API to generate a learning plan
        const response = await axios.post('https://gemini-api-endpoint/learning-plan', {
            technology,
            topics
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` // Add your API key in the headers
            }
        });

        // Send the learning plan back to the client
        res.json({
            message: 'Learning plan generated successfully!',
            learningPlan: response.data.plan
        });
    } catch (error) {
        console.error('Error generating learning plan:', error);
        res.status(500).json({ error: 'Failed to generate learning plan' });
    }
};
