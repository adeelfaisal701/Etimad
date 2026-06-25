import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification
} from "../controllers/notificationController.js";

const router = express.Router();

router.get("/", protect, getNotifications);
router.get("/unread-count", protect, getUnreadCount);
router.put("/mark-all-read", protect, markAllAsRead);
router.put("/:id/read", protect, markAsRead);
router.delete("/:id", protect, deleteNotification);

export default router;
