const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
});

const Cart = model("Cart", cartSchema);
module.exports = Cart;
