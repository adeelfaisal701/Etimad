import express from "express";

import {
  getDashboardStats,
  getUsers,
  deleteUser,
  getProductsAdmin,
  deleteProductAdmin,
  getOrdersAdmin,
  updateOrderStatus,
  deleteOrders
} from "../controllers/adminController.js";

import {protect} from "../middleware/authMiddleware.js";
import {authorize} from "../middleware/roleMiddleware.js";

const router = express.Router();


// DASHBOARD
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  getDashboardStats
);


// USERS
router.get(
  "/users",
  protect,
  authorize("admin"),
  getUsers
);

router.delete(
  "/users/:id",
  protect,
  authorize("admin"),
  deleteUser
);


// PRODUCTS
router.get(
  "/products",
  protect,
  authorize("admin"),
  getProductsAdmin
);

router.delete(
  "/products/:id",
  protect,
  authorize("admin"),
  deleteProductAdmin
);


// ORDERS
router.get(
  "/orders",
  protect,
  authorize("admin"),
  getOrdersAdmin
);

router.put(
  "/orders/:id",
  protect,
  authorize("admin"),
  updateOrderStatus
);

router.delete(
  "/orders/:id",
  protect,
  authorize("admin"),
  deleteOrders
);

export default router;