import express from "express";
import {
  createConversation,
  sendMessage,
  getMessages,
  acceptOffer,
  getConversations
} from "../controllers/chatController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/conversation", protect, createConversation);
router.get("/:id/messages", protect, getMessages);
router.post("/:id/message", protect, sendMessage);

// accept offer → creates order
router.put("/offer/:id/accept", protect, acceptOffer);

router.get("/conversations", protect, getConversations);

export default router;