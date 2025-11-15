const Review = require('../models/Review');

// Create Review
const createReview = async (req, res) => {
  try {
    const review = await Review.create({ ...req.body, user: req.user._id });
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get All Reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user product');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Review
const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviews,
  deleteReview,
};
