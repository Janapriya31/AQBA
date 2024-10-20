// controllers/notificationController.js
const Notification = require('../models/notificationModel');

// Function to create and send a new notification
exports.createNotification = async (req, res) => {
    const { userId, message } = req.body;

    try {
        // Create a new notification with the provided userId and message
        const newNotification = new Notification({
            user: userId,  // Ensure the 'user' field matches your schema
            message
        });

        // Save the notification in the database
        await newNotification.save();
        res.status(201).json({ message: 'Notification created successfully', notification: newNotification });
    } catch (error) {
        console.error('Error creating notification:', error);
        res.status(500).json({ message: 'Error creating notification' });
    }
};

// Function to get notifications for a specific user
exports.getNotifications = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find notifications for the user, sorted by creation date in descending order
        const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json(notifications);
    } catch (error) {
        console.error('Error fetching notifications:', error);
        res.status(500).json({ message: 'Error fetching notifications' });
    }
};
