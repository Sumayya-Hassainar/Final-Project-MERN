// controllers/productController.js
const Product = require("../models/Product");

// helper to build image URLs from multer files
const buildImageUrls = (req, files) => {
  if (!files || files.length === 0) return [];

  return files.map((file) => {
    // if for some reason file or filename is missing, skip it
    if (!file || !file.filename) return null;
    return `${req.protocol}://${req.get("host")}/uploads/products/${file.filename}`;
  }).filter(Boolean); // remove null
};

// Create Product
const createProduct = async (req, res) => {
  try {
    console.log("FILES RECEIVED ON CREATE:", req.files);

    const {
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      isActive,
    } = req.body;

    // vendor from auth token or from body (fallback)
    const vendor = req.user && req.user._id ? req.user._id : req.body.vendor;

    // build image URLs from uploaded files
    const images = buildImageUrls(req, req.files);

    // OPTIONAL: enforce minimum 4 images
    // if (images.length < 4) {
    //   return res
    //     .status(400)
    //     .json({ message: "At least 4 product images are required" });
    // }

    const product = await Product.create({
      vendor,
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      isActive,
      images,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category vendor");
    res.status(200).json(products);
  } catch (error) {
    console.error("Get products error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "category vendor"
    );
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error("Get product by ID error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    console.log("FILES RECEIVED ON UPDATE:", req.files);

    const {
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      isActive,
    } = req.body;

    const updateData = {
      name,
      description,
      category,
      price,
      discountPrice,
      stock,
      isActive,
      updatedAt: new Date(),
    };

    // if new images uploaded, override images array
    if (req.files && req.files.length > 0) {
      const newImages = buildImageUrls(req, req.files);
      updateData.images = newImages;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(400).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
