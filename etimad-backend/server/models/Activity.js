import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false // Null for global updates or marketplace announcements
  },
  type: {
    type: String,
    enum: [
      "Login",
      "Product Update",
      "Order Activity",
      "Profile Update",
      "Marketplace Announcement"
    ],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Activity", activitySchema);
