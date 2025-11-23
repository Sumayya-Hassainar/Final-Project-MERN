// routes/orderStatusRoutes.js
const express = require("express");
const {
  createOrderStatus,
  getOrderStatuses,
  getOrderStatusById,
  updateOrderStatus,
  deleteOrderStatus,
} = require("../controllers/orderStatusController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Admin creates and views all statuses
router
  .route("/")
  .post(protect, adminOnly, createOrderStatus)
  .get(protect, adminOnly, getOrderStatuses);

// Admin can view, update, delete single status
router
  .route("/:id")
  .get(protect, adminOnly, getOrderStatusById)
  .put(protect, adminOnly, updateOrderStatus)
  .delete(protect, adminOnly, deleteOrderStatus);

module.exports = router;
