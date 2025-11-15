const express = require('express');
const { createPayment, getPayments } = require('../controllers/paymentContoller'); // <-- check this path
const { protect, adminOnly } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, adminOnly, getPayments)
  .post(protect, createPayment);

module.exports = router;
