const ActivityLog = require('../models/ActivityLog');

// Log Activity
const logActivity = async (req, res) => {
  try {
    const log = await ActivityLog.create({
      actor: req.user._id,
      actorModel: req.user.role,
      action: req.body.action,
      target: req.body.target || null,
      details: req.body.details || {},
    });
    res.status(201).json(log);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Activity Logs
const getActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate("actor");
    res.status(200).json(logs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  logActivity,
  getActivityLogs,
};
