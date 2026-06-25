import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const addToCart = async (req, res) => {
  const { productId, quantity = 1 } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  let cart = await Cart.findOne({ buyer: req.user.id });

  if (!cart) {
    cart = await Cart.create({
      buyer: req.user.id,
      items: [],
    });
  }

  const existing = cart.items.find(
    (item) => item.product.toString() === productId
  );

  if (existing) {
    existing.quantity += Number(quantity);
  } else {
    cart.items.push({
      product: productId,
      quantity,
      price: product.price,
    });
  }

  await cart.save();

  const populated = await Cart.findById(cart._id).populate(
    "items.product"
  );

  res.json(populated);
};

export const getCart = async (req, res) => {
  let cart = await Cart.findOne({ buyer: req.user.id }).populate(
    "items.product"
  );

  if (!cart) {
    cart = { items: [] };
  }

  res.json(cart);
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;

  const cart = await Cart.findOne({ buyer: req.user.id });

  const item = cart.items.id(req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Item not found" });
  }

  item.quantity = quantity;

  await cart.save();

  const updated = await Cart.findById(cart._id).populate(
    "items.product"
  );

  res.json(updated);
};

export const removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ buyer: req.user.id });

  cart.items.pull(req.params.id);

  await cart.save();

  const updated = await Cart.findById(cart._id).populate(
    "items.product"
  );

  res.json(updated);
};

export const clearCart = async (req, res) => {
  await Cart.findOneAndUpdate(
    { buyer: req.user.id },
    { items: [] }
  );

  res.json({ message: "Cart cleared" });
};