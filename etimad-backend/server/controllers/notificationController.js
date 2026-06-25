import Notification from "../models/Notification.js";

// GET ALL NOTIFICATIONS
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET UNREAD COUNT
export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notification.countDocuments({ user: req.user.id, isRead: false });
    res.json({ unreadCount: count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK NOTIFICATION AS READ
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// MARK ALL AS READ
export const markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany(
      { user: req.user.id, isRead: false },
      { isRead: true }
    );
    res.json({ message: "All notifications marked as read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE NOTIFICATION
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) return res.status(404).json({ message: "Notification not found" });

    if (notification.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await notification.deleteOne();
    res.json({ message: "Notification deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
