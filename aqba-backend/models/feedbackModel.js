const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    questionBankId: { type: mongoose.Schema.Types.ObjectId, ref: 'QuestionBank' },
    rating: { type: Number, min: 1, max: 5 },
    comments: String,
    submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Feedback', feedbackSchema);
