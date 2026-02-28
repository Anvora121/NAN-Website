// routes/cart.routes.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const User = require("../models/User");

// Get user's cart
router.get("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user.cart || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add/update item in cart
router.post("/", protect, async (req, res) => {
  try {
    const { productId, name, price, image_url, quantity } = req.body;
    const user = await User.findById(req.user._id);

    const existingItem = user.cart.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      user.cart.push({ productId, name, price, image_url, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update quantity of a cart item
router.put("/:productId", protect, async (req, res) => {
  try {
    const { quantity } = req.body;
    const user = await User.findById(req.user._id);

    const item = user.cart.find(i => i.productId.toString() === req.params.productId);
    if (item) item.quantity = quantity;

    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Remove an item from cart
router.delete("/:productId", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = user.cart.filter(i => i.productId.toString() !== req.params.productId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Clear entire cart
router.delete("/", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = [];
    await user.save();
    res.json([]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
