const Product = require('../models/Product');

// Create Product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category vendor');
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category vendor');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Product
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (error) {
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

