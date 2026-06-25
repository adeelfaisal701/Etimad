import Order from "../models/Order.js";

// BUYER DASHBOARD
export const buyerDashboard = async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id });

  const totalOrders = orders.length;

  const pending = orders.filter(o => o.status === "Pending Payment").length;
  const completed = orders.filter(o => o.status === "Delivered").length;

  res.json({
    totalOrders,
    pending,
    completed
  });
};

// SELLER DASHBOARD
export const sellerDashboard = async (req, res) => {
  const orders = await Order.find({ seller: req.user.id });

  const totalOrders = orders.length;

  const processing = orders.filter(o => o.status === "Processing").length;
  const delivered = orders.filter(o => o.status === "Delivered").length;
  const shipped = orders.filter(o => o.status === "Shipped").length;
  const completed = orders.filter(o => o.status === "Completed").length;

  const totalEarnings = orders
    .filter(o => o.status === "Completed")
    .reduce((sum, o) => sum + (o.sellerReceivable || 0), 0);

  res.json({
    totalOrders,
    processing,
    delivered,
    totalEarnings,
    shipped,
    completed
  });
};

// SELLER EARNINGS DETAILS
export const sellerEarnings = async (req, res) => {
  const orders = await Order.find({
    seller: req.user.id,
    status: "Completed"
  }).populate("product", "name");

  let total = 0;
  let commission = 0;

  orders.forEach(o => {
    total += o.amount;
    commission += o.adminCommission || 0;
  });

  res.json({
    totalRevenue: total,
    totalCommission: commission,
    netEarnings: total - commission,
    orders
  });
};