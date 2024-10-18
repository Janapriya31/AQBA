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

// Initialize app
const app = express();
dotenv.config();

// Middleware
app.use(cors()); // Enable Cross-Origin Requests
app.use(express.json()); // Body Parser Middleware

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('MongoDB connected');
}).catch((err) => console.log('MongoDB connection error:', err));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Configure storage for Multer (file uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Specify the uploads folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Append the file extension
    }
});
const upload = multer({ storage: storage });

// Upload route for curriculum files
app.post('/api/curriculum/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }
    res.send(`File uploaded successfully: ${req.file.filename}`);
});

// User Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    mobileNumber: String,
    password: String,
    role: String,
    secretCode: String,
});
const User = mongoose.model('User', userSchema);

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
    console.log(`Deleting user with ID: ${req.params.id}`);
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
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
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
    console.log('Login request received with:', { username, password }); // Debug log

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found'); // Debug log
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        console.log('User found:', user); // Debug log

        // Compare provided password with the stored hashed password
        const match = await bcrypt.compare(password, user.password);
        console.log('Password match:', match); // Debug log to check if password is matching

        if (!match) {
            console.log('Password does not match'); // Debug log
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        // Successful login, do not send the password back in the response
        res.status(200).json({ message: 'Login successful', user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.error('Error during login:', error); // Debug log for catching errors
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/google-login', async (req, res) => {
    const { email } = req.body;
    console.log('Google login request received with email:', email); // Debugging

    try {
        const user = await User.findOne({ email });

        if (user) {
            console.log('User found:', user); // Debugging
            res.status(200).json({ exists: true });
        } else {
            console.log('User not found'); // Debugging
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        console.error('Error in Google login route:', error); // Debugging
        res.status(500).json({ error: 'An error occurred while checking the user.' });
    }
});


// Test Route
app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

// Routes
app.use('/api/curriculum', curriculumRoutes);
app.use('/api/questionbank', questionBankRoutes);
app.use('/api/feedback', feedbackRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
