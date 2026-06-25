import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },

    review: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 5,
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Review", reviewSchema);