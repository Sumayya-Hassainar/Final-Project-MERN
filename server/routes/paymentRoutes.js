// routes/paymentRoutes.js
const express = require("express");
const {
  createPayment,
  getPayments,
} = require("../controllers/paymentContoller");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔹 Create fake payment (any logged-in user)
router.post("/", protect, createPayment);

// 🔹 Get all payments (admin only)
router.get("/", protect, adminOnly, getPayments);

module.exports = router;
