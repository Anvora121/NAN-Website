const Product = require("../models/Product");

// ADMIN: Add product
exports.addProduct = async (req, res) => {
  try {
    const { category, name, description, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const product = new Product({
      category,
      name,
      description,
      price: parseFloat(price),
      image: imagePath,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER: Get products by category
exports.getProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category ? { category } : {};

    const products = await Product.find(filter).sort({
      createdAt: -1,
    });

    res.json(products);
  } catch (err) {
    console.error("Get products error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// USER: Get products by category slug
exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    // Convert slug (kurtis) to proper case (Kurtis)
    const categoryName = category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const products = await Product.find({ category: categoryName });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
