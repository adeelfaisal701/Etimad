import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

    quantity: {
      type: Number,
      default: 1,
    },

    subtotal: Number,
    amount: Number,

    adminCommission: {
      type: Number,
      default: 0,
    },

    sellerReceivable: {
      type: Number,
      default: 0,
    },

    shippingInfo: {
      name: String,
      email: String,
      phone: String,
      country: String,
      city: String,
      address: String,
      saveInfo: Boolean,
    },

    paymentMethod: {
      type: String,
      enum: ["Visa", "JazzCash", "Cash on Delivery"],
      default: "Cash on Delivery",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Verified", "Released", "Refunded"],
      default: "Pending",
    },

     status: {
      type: String,
      enum: [
        "Pending Payment",
        "Payment Submitted",
        "Payment Verified",
        "Processing",
        "Shipped",
        "Delivered",
        "Completed",
        "Refunded",
      ],
      default: "Pending Payment",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);