const express = require('express');
const router = express.Router();
const { checkRole, verifyToken } = require('../middleware/auth');

// Protect routes using RBAC
router.use(verifyToken);

router.post('/create-assessment', checkRole('teacher'), (req, res) => {
    // Logic for creating an assessment
    res.send('Assessment created successfully');
});

router.get('/admin-dashboard', checkRole('admin'), (req, res) => {
    // Logic for accessing the admin dashboard
    res.send('Welcome to the admin dashboard');
});

module.exports = router;
