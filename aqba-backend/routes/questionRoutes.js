const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Create a question
router.post('/questions', async (req, res) => {
    const question = new Question(req.body);
    try {
        await question.save();
        res.status(201).send(question);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all questions
router.get('/questions', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).send(questions);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Add more CRUD operations as needed...

module.exports = router;
