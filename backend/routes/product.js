const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.route("/addNewCategory").put(productController.addNewCategory);
router.route("/addNewProduct").put(productController.addNewProduct);
router.route("/getAllProducts").get(productController.getAllProducts);
router
  .route("/getProductsByCategory/:category")
  .get(productController.getProductsByCategory);
router
  .route("/getProductsFromSearch/:searchQuery")
  .get(productController.getProductsFromSearch);

module.exports = router;
