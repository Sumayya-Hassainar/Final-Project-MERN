const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  getDashboard,
  getAllUsersAndVendors,
} = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

// 🔹 Admin Auth
router.post('/register', registerAdmin); // optional, only for initial setup
router.post('/login', loginAdmin);

// 🔹 Admin Dashboard (Protected)
router.get('/dashboard', protect, adminOnly, getDashboard);

// 🔹 Manage Users & Vendors
router.get('/users-vendors', protect, adminOnly, getAllUsersAndVendors);

module.exports = router;
