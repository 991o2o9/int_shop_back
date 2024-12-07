const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    unique: true,
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
