const { Schema, model } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  img: {
    type: String,
    required: [true, "img is required"],
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

const Product = model("Product", productSchema);
module.exports = Product;
