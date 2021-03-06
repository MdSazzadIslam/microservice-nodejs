const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
    },
    rating: {
      type: Number,
      default: 0,
      required: true,
    },

    qty: {
      type: Number,
      default: 1,
      required: true,
    },
    price: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
