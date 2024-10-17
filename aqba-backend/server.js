// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer'); // Import multer
const path = require('path'); // Import path

// Import Routes
const curriculumRoutes = require('./routes/curriculumRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

// Initialize app
const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Allow Cross-Origin Requests
app.use(express.json()); // Replace bodyParser with express.json()

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Configure storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Specify the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});

// Initialize Multer
const upload = multer({ storage: storage });

// Upload route for curriculum
app.post('/api/curriculum/upload', upload.single('file'), (req, res) => {
    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Routes
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/questionbank', questionBankRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
