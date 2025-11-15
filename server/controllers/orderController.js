const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');

// Create Order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('customer vendor products.product orderStatus');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body; // expecting orderStatus id
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Order
const deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Order deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
};

