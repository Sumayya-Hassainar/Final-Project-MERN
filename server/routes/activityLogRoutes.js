const express = require("express");
const {
  logActivity,
  getActivityLogs,
} = require("../controllers/activityLogController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(protect, adminOnly, getActivityLogs)
  .post(protect, logActivity);

module.exports = router;
