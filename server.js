require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Подключаемся к базе данных
connectDB();

// Middleware
app.use(bodyParser.json());

// Настройка CORS
app.use(cors({ origin: "*" }));

// Routes
app.use("/api", productRoutes);
app.use("/api", orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
