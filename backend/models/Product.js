const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      enum: ["Kurtis", "Anarkalis", "Crop Tops", "Western Wear"],
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String, // /uploads/filename.jpg
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
