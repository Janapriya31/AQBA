const jwt = require('jsonwebtoken');
const User = require('./models/user');

// Middleware to authenticate the token
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        // Verify the token and save the user info in the request object
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified; // Save user information in request
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

// Middleware to check user role
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            return next();
        }
        return res.status(403).json({ message: 'Access denied.' });
    };
};

// Export both middleware functions
module.exports = { authenticate, checkRole };
