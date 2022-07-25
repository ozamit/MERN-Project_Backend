const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.route("/AddItemToCart").put(cartController.AddItemToCart);
router.route("/getItemsInCart/:userId").get(cartController.getItemsInCart);
router.route("/changeQuantity/").put(cartController.changeQuantity);
router.route("/removeFromCart/").put(cartController.removeFromCart);

module.exports = router;
