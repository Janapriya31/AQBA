const mongoose = require('mongoose');

// Define the Curriculum schema
const curriculumSchema = new mongoose.Schema({
    filename: { type: String, required: true },   // Name of the uploaded file
    filePath: { type: String, required: true },   // Path where the file is stored
    technology: { type: String, required: true }, // Technology field (e.g., "JavaScript")
    topics: { type: [String], required: true },   // Array of topics related to the curriculum
    uploadedAt: { type: Date, default: Date.now } // Timestamp for when the file was uploaded
});

module.exports = mongoose.model('Curriculum', curriculumSchema);
