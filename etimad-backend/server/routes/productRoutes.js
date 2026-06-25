import express from "express";
import {
  createProduct,
  getMyProducts,
  updateProduct,
  deleteProduct,
   getProducts, getProduct
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();
// router.post("/", protect, authorize("seller"), createProduct);
router.get("/", getProducts);
router.get("/my", protect, getMyProducts);
router.get("/:id", getProduct);
router.post("/", protect, upload.single("image"), createProduct);
router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;