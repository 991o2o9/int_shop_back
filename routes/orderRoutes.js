const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/orders", async (req, res) => {
  try {
    const { phone, orders, totalPrice } = req.body;

    if (!Array.isArray(orders)) {
      return res.status(400).json({ message: "Invalid orders format" });
    }

    if (totalPrice === undefined) {
      return res.status(400).json({ message: "Total price is required" });
    }

    const newOrders = orders.map((order) => {
      if (!order.title || !order.description || !order.price || !order.img) {
        throw new Error(
          "All order items must include title, description, price, and img"
        );
      }

      return {
        phone,
        title: order.title,
        description: order.description,
        img: order.img,
        price: order.price,
        quantity: order.quantity,
        totalPrice: order.price * order.quantity,
      };
    });

    const savedOrders = await Order.insertMany(newOrders);

    res.status(201).json({
      phone,
      orders: savedOrders,
      totalPrice,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    const groupedOrders = orders.reduce((acc, order) => {
      if (!acc[order.phone]) {
        acc[order.phone] = {
          phone: order.phone,
          orders: [],
          totalPrice: 0,
        };
      }

      acc[order.phone].orders.push({
        title: order.title,
        description: order.description,
        price: order.price,
        quantity: order.quantity,
        img: order.img,
      });

      acc[order.phone].totalPrice += order.price * order.quantity;

      return acc;
    }, {});

    const result = Object.values(groupedOrders);

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
