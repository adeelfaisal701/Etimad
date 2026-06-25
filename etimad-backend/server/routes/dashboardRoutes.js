import express from "express";
import {
  buyerDashboard,
  sellerDashboard,
  sellerEarnings
} from "../controllers/dashboardController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/buyer", protect, buyerDashboard);
router.get("/seller", protect, sellerDashboard);
router.get("/seller/earnings", protect, sellerEarnings);

export default router;