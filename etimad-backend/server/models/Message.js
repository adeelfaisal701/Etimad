import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation"
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  text: String,

  //   OFFER SYSTEM
  offerPrice: Number,
  isOffer: {
    type: Boolean,
    default: false
  },
  offerStatus: {
    type: String,
    enum: ["pending",
  "payment_pending",
  "paid",
  "rejected"],
    default: "pending"
  }

}, { timestamps: true });

export default mongoose.model("Message", messageSchema);