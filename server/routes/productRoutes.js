// routes/productRoutes.js
const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const uploadProductImages = require("../middleware/uploadMiddleware");
// const { protect, isVendor, isAdmin } = require("../middleware/authMiddleware"); // if you have

// CREATE product (with multiple images)
router.post(
  "/",
  // protect,
  // isVendor,
  uploadProductImages,   // ✅ multer handles images
  createProduct
);

// UPDATE product (optionally with new images)
router.put(
  "/:id",
  // protect,
  // isVendor,
  uploadProductImages,   // ✅ override images if sent
  updateProduct
);

// READ
router.get("/", getProducts);
router.get("/:id", getProductById);

// DELETE
router.delete(
  "/:id",
  // protect,
  // isVendor,
  deleteProduct
);

module.exports = router;
