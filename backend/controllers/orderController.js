const Order = require("../model/order");

exports.newOrder = async (req, res) => {
  try {
    console.log("req.body.data", req.body.orderData);
    const { userID, orderCity, orderStreet, creditCard, cart } =
      req.body.orderData;
    console.log("HERE");
    const order = new Order({
      userID,
      orderCity,
      orderStreet,
      creditCard,
      cart,
    });
    await order.save();
    res.status(200).json({ order });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Error" });
  }
};
