const express = require("express");
const {
  createReview,
  getReviews,
  deleteReview,
} = require("../controllers/reviewController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getReviews)
  .post(protect, createReview);

router.route("/:id")
  .delete(protect, adminOnly, deleteReview);

module.exports = router;
