const express = require("express");
const { protect, adminOnly, vendorOnly } = require("../middleware/authMiddleware");
const { createOrder } = require("../controllers/orderController");
const { updateOrderStatus } = require("../controllers/orderStatusController");

const router = express.Router();

// customer creates order
router.post("/", protect, createOrder);

// admin or vendor updates order status
router.put("/:id/status", protect, updateOrderStatus);

module.exports = router;
