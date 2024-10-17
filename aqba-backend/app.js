const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => console.log('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    mobileNumber: String,
    password: String,
    role: String,
    secretCode: String,
});

// Define User model
const User = mongoose.model('User', userSchema); // Fix: Create the User model here

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


  app.get('/test', (req, res) => {
    res.send('Test route is working!');
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
    console.log(`Deleting user with ID: ${req.params.id}`); // Debug log
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


// Example Express route for updating a user
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

    try {
        const user = await User.findOne({ username });
        console.log('Incoming login request:', { username, user }); // Debugging log

        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        console.log('User role:', user.role); // Log the user role

        // Return user data and role if everything is okay
        res.status(200).json({ message: 'Login successful', user: { ...user._doc, password: undefined } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
