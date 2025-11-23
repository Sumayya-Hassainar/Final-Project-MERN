// controllers/orderStatusController.js
const OrderStatus = require("../models/OrderStatus");

// Create a new order status
const createOrderStatus = async (req, res) => {
  try {
    const { name, description } = req.body;

    const status = await OrderStatus.create({ name, description });

    res.status(201).json(status);
  } catch (error) {
    console.error("Create OrderStatus error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all order statuses
const getOrderStatuses = async (req, res) => {
  try {
    const statuses = await OrderStatus.find().sort({ createdAt: 1 });
    res.status(200).json(statuses);
  } catch (error) {
    console.error("Get OrderStatuses error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single order status by ID
const getOrderStatusById = async (req, res) => {
  try {
    const status = await OrderStatus.findById(req.params.id);
    if (!status) {
      return res.status(404).json({ message: "Order status not found" });
    }
    res.status(200).json(status);
  } catch (error) {
    console.error("Get OrderStatus by ID error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Update an order status
const updateOrderStatus = async (req, res) => {
  try {
    const status = await OrderStatus.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!status) {
      return res.status(404).json({ message: "Order status not found" });
    }

    res.status(200).json(status);
  } catch (error) {
    console.error("Update OrderStatus error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete an order status
const deleteOrderStatus = async (req, res) => {
  try {
    const status = await OrderStatus.findByIdAndDelete(req.params.id);

    if (!status) {
      return res.status(404).json({ message: "Order status not found" });
    }

    res.status(200).json({ message: "Order status deleted successfully" });
  } catch (error) {
    console.error("Delete OrderStatus error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createOrderStatus,
  getOrderStatuses,
  getOrderStatusById,
  updateOrderStatus,
  deleteOrderStatus,
};
