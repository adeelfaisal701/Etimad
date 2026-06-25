import Activity from "../models/Activity.js";

// GET RECENT ACTIVITIES
export const getActivities = async (req, res) => {
  try {
    // Fetch user activities and global announcements (user is null or matching req.user.id)
    const activities = await Activity.find({
      $or: [
        { user: req.user.id },
        { user: null }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(20); // Limit to top 20 recent activities

    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
