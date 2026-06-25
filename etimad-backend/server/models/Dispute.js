import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  message: String,
  status: {
    type: String,
    enum: ["Open", "Resolved"],
    default: "Open"
  }
}, { timestamps: true });

export default mongoose.model("Dispute", disputeSchema);