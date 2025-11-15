const Vendor = require("../models/Vendor");

// ✅ Create Vendor (Admin only)
const createVendor = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  try {
    const vendor = await Vendor.create(req.body);
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✅ Get All Vendors
const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Vendor
const getVendorById = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Vendor
const updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Vendor (Admin)
const deleteVendor = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Access denied" });

  try {
    const vendor = await Vendor.findByIdAndDelete(req.params.id);
    if (!vendor) return res.status(404).json({ message: "Vendor not found" });
    res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Export all functions (CommonJS)
module.exports = {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
};
