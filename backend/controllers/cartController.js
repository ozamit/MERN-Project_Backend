const Category = require("../model/category");
const Product = require("../model/product");
const Cart = require("../model/Cart");
const ItemInCart = require("../model/itemInCart");

exports.getItemsInCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.params.userId });
    console.log(userCart);
    const cartId = userCart._id;
    const allItemsInCart = await ItemInCart.find({ cart: cartId }).populate(
      "cart"
    );
    res.status(200).json({ message: allItemsInCart });
  } catch (error) {
    res.status(400).json({ status: "error", message: "error" });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    console.log("req.body", req.body);

    const userCart = await Cart.findOne({ userId: req.body.userID });
    console.log("userCart!", userCart);

    const itemCart = await ItemInCart.findOne({
      cart: userCart._id,
      item: req.body.itemId,
    });
    console.log("itemCart", itemCart);
    const deleteItem = await ItemInCart.deleteOne({ _id: itemCart._id });
    console.log(deleteItem);

    res.status(200).json({ message: allItemsInCart });
  } catch (error) {
    console.log(error);
  }
};

exports.changeQuantity = async (req, res) => {
  try {
    console.log("req.body", req.body);
    const userCart = await Cart.findOne({ userId: req.body.userID });
    console.log("userCart!", userCart);
    const itemInCart = await ItemInCart.findOne({
      item: req.body.itemId,
      cart: userCart._id,
    });
    console.log("itemInCart!", itemInCart);
    const oneItemPrice = itemInCart.totalPrice / itemInCart.quantity;
    console.log(oneItemPrice);
    if (req.body.operator === "addOne") {
      const updateQ = itemInCart.quantity + 1;
      const updateP = updateQ * oneItemPrice;
      const updateQuantity = await ItemInCart.updateOne(
        { _id: itemInCart._id },
        { quantity: updateQ, totalPrice: updateP }
      );
    }
    if (req.body.operator === "removeOne") {
      const updateQ = itemInCart.quantity - 1;
      const updateP = updateQ * oneItemPrice;
      const updateQuantity = await ItemInCart.updateOne(
        { _id: itemInCart._id },
        { quantity: updateQ, totalPrice: updateP }
      );
    }
  } catch (error) {}
};

exports.AddItemToCart = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ userId: req.body.userId });
    console.log("userCart: ", userCart);

    if (userCart === null) {
      const newCart = new Cart({
        userId: req.body.userId,
      });
      console.log("newCart", newCart);
      await newCart.save();

      const { _id, price } = req.body;
      const newItemInCart = new ItemInCart({
        item: _id,
        cart: newCart._id,
        quantity: 1,
        totalPrice: price,
      });
      await newItemInCart.save();
      console.log("newItemInCart new cart", newItemInCart);
      res.status(201).json({
        status: "success",
        message: newItemInCart,
        setState: newItemInCart,
      });
    }

    if (userCart !== null) {
      console.log("found cart");
      const { _id, price } = req.body;
      const ifExists = await ItemInCart.findOne({
        cart: userCart._id,
        item: _id,
      });

      if (ifExists === null) {
        const findUserId = req.body.userId;
        const { _id, price } = req.body;
        const findCartId = await Cart.findOne({ userId: findUserId });
        const newItemInCart = new ItemInCart({
          item: _id,
          cart: findCartId._id,
          quantity: 1,
          totalPrice: price,
        });
        await newItemInCart.save();
        const allItemsInCart = await ItemInCart.find({
          cart: findCartId._id,
        }).populate("cart");
        console.log("newItemInCart old cart new item", allItemsInCart);

        res.status(201).json({
          status: "error",
          message: newItemInCart,
          setState: allItemsInCart,
        });
        console.log("saved");
      }

      if (ifExists !== null) {
        const { _id, price, name, img } = req.body;
        const updateQ = ifExists.quantity + 1;
        const updateP = updateQ * price;
        console.log("price", updateP);
        console.log("update", updateQ);
        console.log("ifExists", ifExists);
        const updateQuantity = await ItemInCart.updateOne(
          { _id: ifExists._id },
          { quantity: updateQ, totalPrice: updateP }
        );
        const allItemsInCart = await ItemInCart.find({
          cart: userCart._id,
        }).populate("cart");
        console.log("newItemInCart old cart old item", allItemsInCart);
        res.status(201).json({
          status: "success",
          message: {
            name: name,
            img: img,
            itemId: _id,
            price: updateP,
            quantity: updateQ,
          },
          setState: allItemsInCart,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
