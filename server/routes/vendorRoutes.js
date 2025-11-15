const express = require("express");
const {
  createVendor,
  getVendors,
  getVendorById,
  updateVendor,
  deleteVendor,
} = require("../controllers/vendorController.js");
const { protect, adminOnly } = require("../middleware/authMiddleware.js");

const router = express.Router();

router.route("/")
  .post(protect, adminOnly, createVendor)
  .get(protect, adminOnly, getVendors);

router.route("/:id")
  .get(protect, adminOnly, getVendorById)
  .put(protect, adminOnly, updateVendor)
  .delete(protect, adminOnly, deleteVendor);

module.exports = router;
