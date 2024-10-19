const express = require('express');
const router = express.Router();
const { uploadCurriculum } = require('../controllers/curriculumController');
const multer = require('multer');
const path = require('path');

// Define Multer storage settings
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory where files will be stored
    },
    filename: (req, file, cb) => {
        // Create a unique filename with the original extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Set up Multer with the defined storage settings
const upload = multer({ storage: storage });

// Upload Curriculum Route
router.post('/upload', upload.single('file'), uploadCurriculum);

module.exports = router;
