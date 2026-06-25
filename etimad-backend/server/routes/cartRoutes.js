import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/item/:id", protect, updateCartItem);
router.delete("/item/:id", protect, removeCartItem);
router.delete("/clear", protect, clearCart);

export default router;