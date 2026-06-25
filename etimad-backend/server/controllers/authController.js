import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { logActivity } from "../utils/logger.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email,phone, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
      role
    });

    await logActivity(user._id, "Profile Update", `Registered account: ${name} as ${role}`);

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
export const login = async (req, res) => {

  try {

    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [
        { email: login },
        { phone: login }
      ]
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await logActivity(user._id, "Login", "User logged in successfully");

    res.json({
      token,
      user
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

// SWITCH ROLE
export const switchRole = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Toggle role between buyer and seller
    if (user.role === "buyer") {
      user.role = "seller";
    } else if (user.role === "seller") {
      user.role = "buyer";
    } // Keep admin role unchanged if triggered by admin

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    await logActivity(user._id, "Login", `Switched active dashboard view to ${user.role}`);

    res.json({
      token,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};