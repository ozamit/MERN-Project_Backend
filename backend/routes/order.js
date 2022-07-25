const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.route("/newOrder").put(orderController.newOrder);

module.exports = router;
