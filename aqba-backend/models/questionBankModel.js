const mongoose = require('mongoose');

const questionBankSchema = new mongoose.Schema({
    technology: String,
    topics: [String],
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'] },
    questions: [String], // Questions as an array of strings
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('QuestionBank', questionBankSchema);
