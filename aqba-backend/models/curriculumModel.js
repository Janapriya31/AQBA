const mongoose = require('mongoose');

const curriculumSchema = new mongoose.Schema({
    filename: String,
    technology: String,
    topics: [String],
    uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Curriculum', curriculumSchema);
