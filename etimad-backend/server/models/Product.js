import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: String,
  title: String,
  price: Number,
  description: String,
  image: String,
  images: [String],
  category: String,
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);