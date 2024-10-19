const Curriculum = require('../models/curriculumModel');

exports.uploadCurriculum = async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Log to verify file upload
        console.log("File uploaded successfully:", req.file.filename);

        // Create a new Curriculum document with the uploaded file's details
        const newCurriculum = new Curriculum({
            filename: req.file.filename,      // The name of the uploaded file
            filePath: req.file.path,          // The path where the file is stored
            technology: req.body.technology,  // Curriculum details from the form
            topics: req.body.topics
        });

        // Save the new curriculum document to the database
        await newCurriculum.save();

        // Log success and send a response to the client
        console.log("Curriculum saved to database:", newCurriculum);
        res.json({ message: 'Curriculum uploaded and saved successfully!' });
    } catch (error) {
        // Handle any errors that occur during file upload or database save
        console.error("Error uploading curriculum:", error);
        res.status(500).json({ error: 'Failed to upload curriculum' });
    }
};
