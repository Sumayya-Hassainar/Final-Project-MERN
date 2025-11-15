const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor" },
  paymentMethod: {
    type: String,
    enum: ["Card", "PayPal", "BankTransfer", "COD"],
    required: true,
  },
  amount: { type: Number, required: true },
  transactionId: String,
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Completed", "Failed"], 
    default: "Pending" 
  },
  createdAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
