const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./utils/connectDB");
var cookieParser = require("cookie-parser");
require("dotenv").config();

const path = require("path");

connectDB();

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/user", require("./routes/users"));
app.use("/product", require("./routes/product"));
app.use("/cart", require("./routes/cart"));
app.use("/order", require("./routes/order"));

const PORT = process.env.PORT || 7000;
app.listen(process.env.PORT || 7000, () =>
  console.log(`Football shirts store running on port ${PORT}`)
);
