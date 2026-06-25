import express from "express";
import { register, login, switchRole } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/switch-role", protect, switchRole);

export default router;