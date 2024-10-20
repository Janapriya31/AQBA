const axios = require('axios');
const nodemailer = require('nodemailer');

// Example function for generating questions using Gemini API
const generateQuestions = async (req, res) => {
    const { topic, recipientEmail } = req.body; // Include recipientEmail in request body

    // Check if the required fields are present
    if (!topic || !recipientEmail) {
        return res.status(400).json({ message: 'Topic and recipientEmail are required.' });
    }

    console.log(`Generating questions for topic: ${topic}`);
    console.log(`Sending questions to: ${recipientEmail}`);

    try {
        // Call to Gemini API (replace 'API_ENDPOINT' and 'API_KEY' accordingly)
        const response = await axios.post('https://your-gemini-api-endpoint.com/generate', {
            topic: topic,
            // Include any other necessary data here
        }, {
            headers: {
                'Authorization': `Bearer GEMINI_API_KEY`, // Use your actual API key
                'Content-Type': 'application/json'
            }
        });

        console.log('-------------------------------------------Questions generated successfully==========================================:', response.data.questions);

        // Send the generated questions as a response
        res.status(200).json({
            message: 'Question bank generated successfully!',
            questionBank: {
                topics: [topic], // Include the topic in the response
                questions: response.data.questions,
                _id: response.data._id || 'generated-id', // Assuming the response contains an _id, otherwise set a placeholder
                createdAt: new Date().toISOString(), // Set current date as createdAt
                __v: 0 // Set version if using Mongoose or a similar ORM
            }
        });

        // Send email notification after generating questions
        sendEmailNotification(recipientEmail, response.data.questions);
    } catch (error) {
        console.error('Error generating questions:=================================rs',error);

        console.error('Error generating questions:', error.response ? error.response.data : error.message);
        res.status(500).json({ message: 'Error generating questions' });
    }
};

// Set up Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // your email from environment
        pass: process.env.EMAIL_PASSWORD // your email password from environment
    }
});

// Send email notification function
const sendEmailNotification = (recipientEmail, questions) => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: recipientEmail,
        subject: 'Your Generated Questions',
        text: `Here are your generated questions:\n${questions.join('\n')}` // Join questions into a string
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = { generateQuestions };
