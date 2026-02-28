const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  addProduct,
  getProducts,
  getProductsByCategory,
} = require("../controllers/productController");

// Admin
router.post("/add", upload.single("image"), addProduct);

// User
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);

module.exports = router;
