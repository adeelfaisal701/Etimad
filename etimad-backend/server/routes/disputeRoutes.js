import express from "express";
import { createDispute, getDisputes } from "../controllers/disputeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createDispute);
router.get("/", protect, getDisputes);

export default router;