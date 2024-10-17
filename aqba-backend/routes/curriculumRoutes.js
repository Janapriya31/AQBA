const express = require('express');
const router = express.Router();
const { uploadCurriculum } = require('../controllers/curriculumController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

// Upload Curriculum Route
router.post('/upload', upload.single('file'), uploadCurriculum);

module.exports = router;
