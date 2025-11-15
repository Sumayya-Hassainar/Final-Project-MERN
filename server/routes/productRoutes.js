const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, adminOnly, vendorOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getProducts)
  .post(protect, vendorOnly, createProduct);

router.route("/:id")
  .get(getProductById)
  .put(protect, vendorOnly, updateProduct)
  .delete(protect, vendorOnly, deleteProduct);

module.exports = router;
