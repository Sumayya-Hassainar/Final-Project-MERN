const Notification = require('../models/Notification');

// Create Notification
const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Notifications
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().populate("recipient");
    res.status(200).json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createNotification,
  getNotifications,
};
