const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: "Vendor", required: true },
  name: { type: String, required: true },
  description: String,
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  price: { type: Number, required: true },
  discountPrice: Number,
  images: [String],
  stock: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  ratingsAverage: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
