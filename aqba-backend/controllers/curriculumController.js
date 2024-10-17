const Curriculum = require('../models/curriculumModel');
const multer = require('multer');

// Set up file upload
const upload = multer({ dest: 'uploads/' });

exports.uploadCurriculum = async (req, res) => {
    try {
        const newCurriculum = new Curriculum({
            filename: req.file.filename,
            technology: req.body.technology,
            topics: req.body.topics
        });
        await newCurriculum.save();
        res.json({ message: 'Curriculum uploaded successfully!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload curriculum' });
    }
};
