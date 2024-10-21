const axios = require('axios');

exports.generateQuestionBank = async (req, res) => {
    const { subject, difficulty } = req.body;

    try {
        const response = await axios.post('GEMINI_API_URL', {
            subject,
            difficulty,
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error('Error generating question bank:', error);
        res.status(500).json({ message: 'Error generating question bank' });
    }
};
