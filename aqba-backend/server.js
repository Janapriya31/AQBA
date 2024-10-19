const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// Import Routes
const curriculumRoutes = require('./routes/curriculumRoutes');
const questionBankRoutes = require('./routes/questionBankRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

// Initialize app
const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => console.log('MongoDB connection error:', err));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

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

// User Schema and Model (Prevention of model overwriting)
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
app.use('/api', userRoutes);
app.use('/api', questionRoutes);

// Fetch all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Fetch single user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).send('User deleted successfully');
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send('Error deleting user');
    }
});

// Update a user
app.put('/users/:id', async (req, res) => {
    try {
        const { name, role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, role }, { new: true });

        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).send('Error updating user');
    }
});

// Registration Route
app.post('/register', async (req, res) => {
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
app.post('/login', async (req, res) => {
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

// Google Login Route
app.post('/google-login', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error('Error in Google login route:', error);
        res.status(500).json({ error: 'An error occurred while checking the user.' });
    }
});

// Test Route
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message
        }
    });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
