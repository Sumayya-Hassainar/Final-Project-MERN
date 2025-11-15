const express = require("express");
const {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { protect, adminOnly, vendorOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(protect, adminOnly, getOrders)
  .post(protect, createOrder);

router.route("/:id")
  .put(protect, vendorOnly, updateOrderStatus)
  .delete(protect, adminOnly, deleteOrder);

module.exports = router;
