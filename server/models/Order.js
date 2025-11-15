const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: { 
    type: String, 
    enum: ["Pending", "Paid", "Refunded"], 
    default: "Pending" 
  },
  orderStatus: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "OrderStatus", 
    required: true 
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: String,
  },
  trackingId: String,
  deliveryDate: Date,
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
