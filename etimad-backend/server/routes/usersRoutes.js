import express from "express";

import {protect} from "../middleware/authMiddleware.js";

import {
  getProfile,
  updateProfile,
  changePassword
} from "../controllers/userController.js";

const router = express.Router();


// GET PROFILE
router.get(
  "/profile",
  protect,
  getProfile
);


// UPDATE PROFILE
router.put(
  "/profile",
  protect,
  updateProfile
);


// CHANGE PASSWORD
router.put(
  "/change-password",
  protect,
  changePassword
);

export default router;