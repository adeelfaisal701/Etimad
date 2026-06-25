import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  members: [
    { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  ],
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }
}, { timestamps: true });

export default mongoose.model("Conversation", conversationSchema);