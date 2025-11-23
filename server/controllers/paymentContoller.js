// controllers/paymentController.js
const Payment = require("../models/Payment");
const { v4: uuidv4 } = require("uuid"); // npm i uuid

// Create a "fake" payment
const createPayment = async (req, res) => {
  try {
    const { order, vendor, amount, paymentMethod } = req.body;

    // transactionId: generate fake ID
    const transactionId = "TXN-" + uuidv4().slice(0, 8).toUpperCase();

    const payment = await Payment.create({
      order,
      user: req.user?._id,     // from protect middleware
      vendor,
      amount,
      paymentMethod,
      transactionId,
      paymentStatus: "Completed", // assume success
    });

    res.status(201).json({
      message: "Payment simulated successfully",
      payment,
    });
  } catch (error) {
    console.error("Create payment error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get all payments (admin only)
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("order user vendor");
    res.status(200).json(payments);
  } catch (error) {
    console.error("Get payments error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPayment,
  getPayments,
};
