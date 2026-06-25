import Activity from "../models/Activity.js";
import Notification from "../models/Notification.js";

// Helper to create notifications and dispatch real-time socket events
export const createNotification = async (req, userId, type, title, message) => {
  try {
    const notification = await Notification.create({
      user: userId,
      type,
      title,
      message
    });

    const io = req?.app?.get("io");
    if (io) {
      io.to(userId.toString()).emit("newNotification", notification);
    }
    return notification;
  } catch (err) {
    console.error("Error creating notification:", err);
  }
};

// Helper to create activity log entries
export const logActivity = async (userId, type, message) => {
  try {
    await Activity.create({
      user: userId,
      type,
      message
    });
  } catch (err) {
    console.error("Error logging activity:", err);
  }
};
