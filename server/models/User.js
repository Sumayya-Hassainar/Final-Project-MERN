const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["customer", "vendor", "admin"],
    default: "customer"
  },
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: String,
  },
  isActive: { type: Boolean, default: true },
  twoFactorEnabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

// Encrypt password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
