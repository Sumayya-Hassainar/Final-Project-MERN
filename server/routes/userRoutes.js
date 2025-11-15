const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  checkRole,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/profile", protect, getProfile);
router.get("/check-role", protect, checkRole);
router.post("/logout", protect, logoutUser);

module.exports = router;
