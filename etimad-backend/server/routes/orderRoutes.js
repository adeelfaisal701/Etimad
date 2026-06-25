import express from "express";
import {
  placeOrder,
  submitPayment,
  confirmDelivery,
  getMyOrders,
  getBuyerOrders,
  getSellerOrders,
  updateOrderStatus,
  createOrder,
  markReceived

} from "../controllers/orderController.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("buyer"), placeOrder);
router.get("/my", protect, authorize("buyer"), getMyOrders);

router.post("/:id/payment", protect, authorize("buyer"), submitPayment);
router.put("/:id/confirm", protect, authorize("buyer"), confirmDelivery);

router.get("/buyer", protect, getBuyerOrders);
router.get("/seller", protect, getSellerOrders);
router.put("/:id/status", protect, updateOrderStatus);

router.post("/create", protect, createOrder);
router.put("/:id/received", protect, markReceived);

export default router;