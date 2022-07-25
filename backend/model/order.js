const { Schema, model } = require("mongoose");

const OrderSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
    require: true,
  },
  orderCity: { type: String, require: true },
  orderStreet: { type: String, require: true },
  creditCard: { type: Number, required: true, length: 4 },
  date: {
    type: Date,
    default: Date.now,
  },
  cart: { type: Schema.Types.Mixed },
});

const Order = model("Order", OrderSchema);
module.exports = Order;
