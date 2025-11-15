const Payment = require('../models/Payment');

// Create Payment
const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Payments
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('order user');
    res.status(200).json(payments);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { createPayment, getPayments };
