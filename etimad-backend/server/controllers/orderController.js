import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Message from "../models/Message.js";
import { createNotification, logActivity } from "../utils/logger.js";

// Buyer places order
export const placeOrder = async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const order = await Order.create({
      product: product._id,
      buyer: req.user.id,
      seller: product.seller,
      amount: product.price
    });

    // Create notifications and logs
    await createNotification(req, product.seller, "New Order", "New Order Received", `A buyer placed an order for "${product.name || product.title}" (Rs. ${product.price})`);
    await logActivity(req.user.id, "Order Activity", `Placed order for "${product.name || product.title}"`);
    await logActivity(product.seller, "Order Activity", `Received new order for "${product.name || product.title}"`);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE ORDER AFTER PAYMENT
export const createOrder = async (req, res) => {
  const { messageId, cardName, cardNumber } = req.body;

  const msg = await Message.findById(messageId)
    .populate({
      path: "conversation",
      populate: { path: "product" }
    });

  if (!msg) {
    return res.status(404).json({
      message: "Offer not found"
    });
  }

  // already accepted
  if (msg.offerStatus === "paid") {
    return res.status(400).json({
      message: "Order already created"
    });
  } else {
    msg.offerStatus = "paid";
    await msg.save();
  }

  const convo = msg.conversation;
  const seller = msg.sender;
  const buyer = convo.members.find(
    (m) => m.toString() !== seller.toString()
  ); 

  // commission
  const commission = msg.offerPrice * 0.10;

  // create order
  const order = await Order.create({
    product: convo.product?._id || convo.product,
    buyer,
    seller,
    amount: msg.offerPrice,
    adminCommission: commission,
    sellerAmount: msg.offerPrice - commission,
    paymentStatus: "On Hold",
    cardLast4: cardNumber.slice(-4),
    status: "Processing"
  });

  const productName = convo.product?.name || convo.product?.title || "Custom Offer Product";
  await createNotification(req, seller, "New Order", "Custom Offer Paid", `Buyer accepted and paid Rs. ${msg.offerPrice} for "${productName}"`);
  await createNotification(req, buyer, "New Order", "Order Created", `Your custom order for "${productName}" has been successfully created`);
  await logActivity(buyer, "Order Activity", `Paid Rs. ${msg.offerPrice} for custom offer on "${productName}"`);
  await logActivity(seller, "Order Activity", `Received Rs. ${msg.offerPrice} custom offer payment for "${productName}"`);

  res.json(order);
};

// Buyer submits payment proof
export const submitPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentProof = req.body.paymentProof;
    order.transactionId = req.body.transactionId;
    order.status = "Payment Submitted";

    await order.save();

    const productName = order.product?.name || order.product?.title || "Product";
    await createNotification(req, order.seller, "Account Updates", "Payment Proof Submitted", `Buyer submitted payment proof for "${productName}"`);
    await logActivity(order.buyer, "Order Activity", `Submitted payment proof for "${productName}"`);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buyer confirms delivery
export const confirmDelivery = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = "Completed";
    await order.save();

    const productName = order.product?.name || order.product?.title || "Product";
    await createNotification(req, order.seller, "Order Delivered", "Order Completed", `Buyer confirmed delivery of "${productName}"`);
    await logActivity(order.buyer, "Order Activity", `Confirmed delivery of "${productName}"`);
    await logActivity(order.seller, "Order Activity", `Order completed: "${productName}"`);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get buyer orders
export const getMyOrders = async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id }).populate("product");
  res.json(orders);
};

// Buyer orders
export const getBuyerOrders = async (req, res) => {
  const orders = await Order.find({ buyer: req.user.id })
    .sort({ createdAt: -1 })
    .populate("product", "name image")
    .populate("seller", "name");

  res.json(orders);
};

// Seller orders
export const getSellerOrders = async (req, res) => {
  const orders = await Order.find({ seller: req.user.id })
    .sort({ createdAt: -1 })
    .populate("product", "name image")
    .populate("buyer", "name");

  res.json(orders);
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id).populate("product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // only seller can update
    if (order.seller.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    order.status = status;
    await order.save();

    const productName = order.product?.name || order.product?.title || "Product";
    
    // Determine notification types based on status
    let notifType = "Account Updates";
    if (status === "Shipped") notifType = "Order Shipped";
    if (status === "Delivered") notifType = "Order Delivered";

    await createNotification(req, order.buyer, notifType, `Order ${status}`, `Seller updated your order for "${productName}" to "${status}"`);
    await logActivity(order.seller, "Order Activity", `Updated status of "${productName}" to ${status}`);
    await logActivity(order.buyer, "Order Activity", `Order status updated to ${status} for "${productName}"`);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// BUYER CONFIRM RECEIVED
export const markReceived = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // only buyer
    if (order.buyer.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    order.status = "Completed";
    order.paymentStatus = "Released";

    await order.save();

    const productName = order.product?.name || order.product?.title || "Product";
    await createNotification(req, order.seller, "Order Delivered", "Order Completed & Funds Released", `Buyer marked "${productName}" as received. Rs. ${(order.sellerAmount || order.amount).toFixed(2)} has been released to your balance.`);
    await logActivity(order.buyer, "Order Activity", `Marked order for "${productName}" as received`);
    await logActivity(order.seller, "Order Activity", `Order marked received and funds released for "${productName}"`);

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};