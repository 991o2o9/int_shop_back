const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderSchema);
