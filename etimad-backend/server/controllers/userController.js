import User from "../models/User.js";
import bcrypt from "bcryptjs";


// ======================
// GET PROFILE
// ======================

export const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user.id)
      .select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// ======================
// UPDATE PROFILE
// ======================

export const updateProfile = async (req, res) => {
  try {

    const { name, email, phone } = req.body;

    const user = await User.findById(req.user.id);

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;

    await user.save();

    res.json({
      message: "Profile updated",
      user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// ======================
// CHANGE PASSWORD
// ======================

export const changePassword = async (req, res) => {
  try {

    const { password } = req.body;

    const user = await User.findById(req.user.id);

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;

    await user.save();

    res.json({
      message: "Password updated"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};