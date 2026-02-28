// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: String,
    phone: String,
    gender: String,
    address: {
      line1: String,
      city: String,
      state: String,
      pincode: String,
    },
    profilePic: String,
    cart: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        price: Number,
        image_url: String,
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
