import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

// -------------------------------------
// Commission Calculation by Slabs
// 0 - 5,000       => 8%
// 5,001 - 50,000  => 5%
// 50,001 - 200,000 => 3%
// 200,001 - 500,000 => 2%
// Above 500,000   => 2%
// -------------------------------------
const calculateCommission = (amount) => {
  let commission = 0;

  if (amount <= 5000) {
    commission = amount * 0.08;
  } else if (amount <= 50000) {
    commission = amount * 0.05;
  } else if (amount <= 200000) {
    commission = amount * 0.03;
  } else if (amount <= 500000) {
    commission = amount * 0.02;
  } else {
    commission = amount * 0.02;
  }

  // -------------------------------------
  // MAX COMMISSION CAP (TEMPORARILY DISABLED)
  // Uncomment later if needed
  //
  // const COMMISSION_CAP = 500;
  // commission = Math.min(commission, COMMISSION_CAP);
  // -------------------------------------

  return Math.round(commission);
};

export const checkout = async (req, res) => {
  const { shippingInfo, paymentMethod } = req.body;

  const cart = await Cart.findOne({
    buyer: req.user.id,
  }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    return res.status(400).json({
      message: "Cart is empty",
    });
  }

  const createdOrders = [];

  for (const item of cart.items) {
    const subtotal = item.price * item.quantity;

    // Calculate commission according to slabs
    const commission = calculateCommission(subtotal);

    // Amount seller will receive
    const sellerReceivable = subtotal - commission;

    const order = await Order.create({
      product: item.product._id,
      buyer: req.user.id,
      seller: item.product.seller,

      quantity: item.quantity,
      subtotal,
      amount: subtotal,

      adminCommission: commission,
      sellerReceivable,

      shippingInfo,
      paymentMethod,

      paymentStatus:
        paymentMethod === "Cash on Delivery"
          ? "Pending"
          : "Verified",

      status:
        paymentMethod === "Cash on Delivery"
          ? "Processing"
          : "Payment Verified",
    });

    createdOrders.push(order);
  }

  // Clear cart after successful checkout
  cart.items = [];
  await cart.save();

  res.json({
    message: "Order placed successfully",
    orders: createdOrders,
  });
};