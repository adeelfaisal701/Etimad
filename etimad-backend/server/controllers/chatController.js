import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import Order from "../models/Order.js";

// Create or get conversation
export const createConversation = async (req, res) => {
  const { sellerId, productId } = req.body;

  let convo = await Conversation.findOne({
    members: { $all: [req.user.id, sellerId] },
    product: productId
  });

  if (!convo) {
    convo = await Conversation.create({
      members: [req.user.id, sellerId],
      product: productId
    });
  }

  res.json(convo);
};

// Send message OR offer
export const sendMessage = async (req, res) => {
  const { text, offerPrice } = req.body;

  if (!text && !offerPrice) {
    return res.status(400).json({ message: "Message or offer required" });
  }

  const msg = await Message.create({
    conversation: req.params.id,
    sender: req.user.id,
    text: text || "",
    offerPrice: offerPrice || null,
    isOffer: !!offerPrice
  });

  res.json(msg);
};

// Get messages
export const getMessages = async (req, res) => {
  const msgs = await Message.find({ conversation: req.params.id })
    .populate("sender", "_id name");

  res.json(msgs);
};

// Accept offer → CREATE ORDER
export const acceptOffer = async (req, res) => {
  const msg = await Message.findById(req.params.id)
    .populate("conversation");

  if (!msg) {
    return res.status(404).json({ message: "Offer not found" });
  }

  // ❗ must be an offer
  if (!msg.isOffer) {
    return res.status(400).json({ message: "Not an offer message" });
  }

  // ❗ prevent duplicate accept
  if (msg.offerStatus === "accepted") {
    return res.status(400).json({ message: "Offer already accepted" });
  }

  const convo = msg.conversation;

  //   Identify buyer & seller properly
  const buyer = msg.sender; // sender = buyer (who made offer)
  const seller = convo.members.find(
    (m) => m.toString() !== buyer.toString()
  );

  // ❗ ONLY seller can accept
  if (req.user.id !== seller.toString()) {
    return res.status(403).json({ message: "Only seller can accept offer" });
  }

  // ✅ update message
  msg.offerStatus = "accepted";
  await msg.save();

  //   COMMISSION (10%)
  const commission = msg.offerPrice * 0.10;

  const existingOrder = await Order.findOne({
  product: convo.product,
  buyer,
  seller,
  amount: msg.offerPrice
});

if (existingOrder) {
  return res.status(400).json({ message: "Order already exists" });
}

  //   CREATE ORDER
  const order = await Order.create({
    product: convo.product,
    buyer,
    seller,
    amount: msg.offerPrice,
    adminCommission: commission,
    sellerAmount: msg.offerPrice - commission,
    status: "Pending Payment"
  });

  res.json({ msg, order });
};

// Get all conversations for logged-in user
export const getConversations = async (req, res) => {
  const conversations = await Conversation.find({
    members: req.user.id
  })
    .populate("members", "name")
    .populate("product", "name");

  res.json(conversations);
};