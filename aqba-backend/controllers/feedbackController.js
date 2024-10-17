const Feedback = require('../models/feedbackModel');

exports.submitFeedback = async (req, res) => {
    try {
        const newFeedback = new Feedback(req.body);
        await newFeedback.save();
        res.json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
};
