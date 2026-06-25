import Product from "../models/Product.js";


// Get all products (Public)
export const getProducts = async (req, res) => {
  const products = await Product.find().populate("seller", "name");
  res.json(products);
};

// Get single product
export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
};

// CREATE
export const createProduct = async (req, res) => {
  const { name, title, price, description, category, stockQuantity, status } = req.body;

  const product = await Product.create({
    name: name || title,
    title: title || name,
    price,
    description,
    category: category || "General",
    stockQuantity: Number(stockQuantity) || 0,
    status: status || "Active",
    seller: req.user.id,
    image: req.file ? `/uploads/${req.file.filename}` : "",
    images: req.file ? [`/uploads/${req.file.filename}`] : []
  });

  res.json(product);
};

// GET SELLER PRODUCTS
export const getMyProducts = async (req, res) => {
  const products = await Product.find({ seller: req.user.id });
  res.json(products);
};

// UPDATE
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "Not found" });

  if (product.seller.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const nameVal = req.body.name || req.body.title;
  const titleVal = req.body.title || req.body.name;

  product.name = nameVal || product.name;
  product.title = titleVal || product.title;
  product.price = req.body.price || product.price;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.stockQuantity = req.body.stockQuantity !== undefined ? Number(req.body.stockQuantity) : product.stockQuantity;
  product.status = req.body.status || product.status;

  if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
    product.images = [`/uploads/${req.file.filename}`];
  }

  await product.save();

  res.json(product);
};

// DELETE
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).json({ message: "Not found" });

  if (product.seller.toString() !== req.user.id) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  await product.deleteOne();

  res.json({ message: "Deleted" });
};