import User from "../models/User.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";


// =========================
// DASHBOARD
// =========================

export const getDashboardStats = async (req, res) => {
  try {

    const totalBuyers = await User.countDocuments({
      role: "buyer"
    });

    const totalSellers = await User.countDocuments({
      role: "seller"
    });

    const totalProducts = await Product.countDocuments();

    const totalOrders = await Order.countDocuments();

    //  TOTAL COMMISSION
    const orders = await Order.find();

    const totalRevenue = orders.reduce(
      (sum, o) => sum + (o.adminCommission || 0),
      0
    );

    res.json({
      totalRevenue,
      totalBuyers,
      totalSellers,
      totalProducts,
      totalOrders
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// =========================
// USERS
// =========================

export const getUsers = async (req, res) => {
  try {

    const users = await User.find()
      .sort({ createdAt: -1 });

    res.json(users);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// =========================
// DELETE USER
// =========================

export const deleteUser = async (req, res) => {
  try {

    await User.findByIdAndDelete(req.params.id);

    res.json({
      message: "User deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// =========================
// PRODUCTS
// =========================

export const getProductsAdmin = async (req, res) => {
  try {

    const products = await Product.find()
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    res.json(products);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// =========================
// DELETE PRODUCT
// =========================

export const deleteProductAdmin = async (req, res) => {
  try {

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      message: "Product deleted"
    });

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};


// =========================
// ORDERS
// =========================

export const getOrdersAdmin = async (req, res) => {
  try {

    const orders = await Order.find()
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .populate("product", "name image")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};

 export const deleteOrders =  async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// =========================
// UPDATE ORDER STATUS
// =========================

export const updateOrderStatus = async (req, res) => {
  try {

    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    order.status = status;

    //  RELEASE PAYMENT
    if (status === "Completed") {
      order.paymentStatus = "Released";
    }

    //  REFUND
    if (status === "Refunded") {
      order.paymentStatus = "Refunded";
    }

    await order.save();

    res.json(order);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};