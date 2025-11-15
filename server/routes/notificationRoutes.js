const express = require("express");
const {
  createNotification,
  getNotifications,
} = require("../controllers/notificationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(protect, adminOnly, getNotifications)
  .post(protect, createNotification);

module.exports = router;
