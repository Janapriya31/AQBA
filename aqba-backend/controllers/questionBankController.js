const QuestionBank = require('../models/questionBankModel');

exports.generateQuestionBank = async (req, res) => {
    try {
        const { technology, topics, difficulty, numQuestions } = req.body;
        
        // Mocking questions for now
        const questions = Array(numQuestions).fill('Sample Question');
        
        const newQuestionBank = new QuestionBank({
            technology,
            topics,
            difficulty,
            questions
        });
        await newQuestionBank.save();
        res.json({ message: 'Question bank generated successfully!', questionBank: newQuestionBank });
    } catch (error) {
        res.status(500).json({ error: 'Failed to generate question bank' });
    }
};
