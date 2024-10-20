const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

// Import Routes
const curriculumRoutes = require('./routes/curriculumRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const geminiRoutes = require('./routes/geminiRoutes'); // Gemini API routes
const authRoutes = require('./routes/auth');
const assessmentRoutes = require('./routes/assessments'); // Assessment routes
const notificationRoutes = require('./routes/notificationRoutes');
const aiRoutes = require('./routes/airoutes'); // AI Task routes


// Initialize app
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch((err) => console.log('MongoDB connection error:', err));

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Curriculum file upload route
app.post('/api/curriculum/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// User Schema and Model (Avoid overwriting model)
let User;
try {
    User = mongoose.model('User');
} catch (error) {
    User = mongoose.model('User', new mongoose.Schema({
        name: String,
        username: String,
        email: String,
        mobileNumber: String,
        password: String,
        role: String,
        secretCode: String,
    }));
}

// Routes
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/questionbank', questionBankRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/gemini', geminiRoutes); // Gemini API integration
app.use('/api/auth', authRoutes);
app.use('/api/assessments', assessmentRoutes); // Assessment routes
app.use('/api/notifications', notificationRoutes);

// User Routes for basic CRUD operations
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Other CRUD operations for users...
// (Keep your existing user CRUD routes here)

// Registration Route
app.post('/api/register', async (req, res) => {
    const { username, email, password, name, mobileNumber, role, secretCode } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            mobileNumber,
            password: hashedPassword,
            role,
            secretCode: (role === 'Administrator' || role === 'Trainer') ? secretCode : null,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login Route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({ message: 'Login successful', user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

// Test Route
app.get('/api/test', (req, res) => {
    res.send('Test route is working!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Error:', err); // Log the error for debugging
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error'
        }
    });
});

// WebSocket configuration for real-time notifications
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
    console.log('New WebSocket connection established');

    // Send real-time notifications
    socket.on('sendNotification', (notification) => {
        io.emit('receiveNotification', notification);
    });
});

// Start the server with WebSocket and HTTP support
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
