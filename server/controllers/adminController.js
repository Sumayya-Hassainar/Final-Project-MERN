const Admin = require('../models/Admin');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 🔹 Admin Registration (optional for setup)
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await Admin.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Admin created successfully', admin });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔹 Admin Login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: admin._id, role: 'Admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      admin: { id: admin._id, name: admin.name, email: admin.email },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get Admin Dashboard Data (example stats)
const getDashboard = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const vendorCount = await Vendor.countDocuments();
    const adminCount = await Admin.countDocuments();

    res.status(200).json({
      message: 'Dashboard data fetched successfully',
      stats: { userCount, vendorCount, adminCount },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Get All Users and Vendors
const getAllUsersAndVendors = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    const vendors = await Vendor.find().select('-password');
    res.status(200).json({ users, vendors });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getDashboard,
  getAllUsersAndVendors,
};
