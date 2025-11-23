// controllers/orderStatusController.js
const Order = require("../models/Order");
const OrderStatus = require("../models/OrderStatus");
const ActivityLog = require("../models/ActivityLog");

// Admin or Vendor updates order status
const updateOrderStatus = async (req, res) => {
  try {
    const { statusId } = req.body; // send OrderStatus _id in body
    const orderId = req.params.id;

    const statusDoc = await OrderStatus.findById(statusId);
    if (!statusDoc) {
      return res.status(404).json({ message: "Order status not found" });
    }

    const order = await Order.findByIdAndUpdate(
      orderId,
      { orderStatus: statusId },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // 🔹 Who is updating? admin or vendor (from auth middleware)
    const actorId = req.user._id;
    const actorRole =
      req.user.role === "admin"
        ? "Admin"
        : req.user.role === "vendor"
        ? "Vendor"
        : "User";

    // 🔹 Create ActivityLog
    await ActivityLog.create({
      actor: actorId,
      actorModel: actorRole, // must be "User" | "Vendor" | "Admin"
      action: "UPDATE_ORDER_STATUS",
      target: `Order:${order._id}`,
      details: {
        newStatusId: statusId,
        newStatusName: statusDoc.name,
      },
    });

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = { updateOrderStatus };
