const express = require('express');
const { createNotification, getNotifications } = require('../controllers/notificationController');
const router = express.Router();

router.post('/send', createNotification);
router.get('/:userId', getNotifications);

module.exports = router;
