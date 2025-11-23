const express = require("express");
const userRoutes = require("./userRoutes");
const vendorRoutes = require("./vendorRoutes");
const categoryRoutes = require("./categoryRoutes");
const productRoutes = require("./productRoutes");
const orderRoutes = require("./orderRoutes");
const paymentRoutes = require("./paymentRoutes");
const reviewRoutes = require("./reviewRoutes");
const notificationRoutes = require("./notificationRoutes");
const activityLogRoutes = require("./activityLogRoutes");
const customerRoutes=require('./customerRoutes');
const adminRoutes=require("./adminRoutes");
const orderStatusRoutes = require("./orderStatusRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/vendors", vendorRoutes);
router.use("/categories", categoryRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);
router.use("/payments", paymentRoutes);
router.use("/reviews", reviewRoutes);
router.use("/notifications", notificationRoutes);
router.use("/activity-logs", activityLogRoutes);
router.use("/customer",customerRoutes);
router.use("/admin",adminRoutes);
router.use("/order-statuses", orderStatusRoutes);

module.exports = router;
