import Review from "../models/Review.js";
import User from "../models/User.js";


export const createReview = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const review = await Review.create({
      user: req.user.id,
      name: user.name,
      review: req.body.review,
      rating: req.body.rating || 5,
    });

    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};