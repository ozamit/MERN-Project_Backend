const { Schema, model } = require("mongoose");

const itemInCartSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
});

const ItemInCart = model("ItemInCart", itemInCartSchema);
module.exports = ItemInCart;
