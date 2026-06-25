import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Message from "../models/Message.js";


// Buyer places order
export const placeOrder = async (req, res) => {
  const product = await Product.findById(req.body.productId);

  const order = await Order.create({
    product: product._id,
    buyer: req.user.id,
    seller: product.seller,
    amount: product.price
  });

  res.json(order);
};
// CREATE ORDER AFTER PAYMENT
export const createOrder = async (req, res) => {
  const { messageId, cardName, cardNumber } = req.body;

  const msg = await Message.findById(messageId)
    .populate("conversation");

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
}else{
    msg.offerStatus = "paid";
  await msg.save();
}

  const convo = msg.conversation;
 const seller = msg.sender;
  const buyer =convo.members.find(
    (m) => m.toString() !== seller.toString()
  ); 

 

  // ONLY seller can trigger acceptance
  // if (req.user.id !== seller.toString()) {
  //   return res.status(403).json({
  //     message: "Unauthorized"
  //   });
  // }


  // commission
  const commission = msg.offerPrice * 0.10;

  // create order
  const order = await Order.create({
    product: convo.product,
   buyer,
  seller,
    amount: msg.offerPrice,

    adminCommission: commission,
    sellerAmount: msg.offerPrice - commission,

    paymentStatus: "On Hold",

    cardLast4: cardNumber.slice(-4),

    status: "Processing"
  });

  res.json(order);
};

// Buyer submits payment proof
export const submitPayment = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.paymentProof = req.body.paymentProof; // later use multer
  order.transactionId = req.body.transactionId;
  order.status = "Payment Submitted";

  await order.save();

  res.json(order);
};

// Buyer confirms delivery
export const confirmDelivery = async (req, res) => {
  const order = await Order.findById(req.params.id);

  order.status = "Completed";

  await order.save();

  res.json(order);
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
  const { status } = req.body;

  const order = await Order.findById(req.params.id);

  if (!order) return res.status(404).json({ message: "Order not found" });

  // only seller can update
  if (order.seller.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  order.status = status;
  await order.save();

  res.json(order);
};
// BUYER CONFIRM RECEIVED
export const markReceived = async (req, res) => {
  const order = await Order.findById(req.params.id);

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

  //  RELEASE PAYMENT
  order.paymentStatus = "Released";

  await order.save();

  res.json(order);
};