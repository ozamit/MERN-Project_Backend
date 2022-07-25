const Category = require("../model/category");
const Product = require("../model/product");

exports.addNewCategory = async (req, res) => {
  try {
    console.log(req.body.data);
    const { name } = req.body.data;
    console.log("name", name);

    const category = new Category({
      name,
    });
    await category.save();
    res.status(201).json({ newCategory });
  } catch (error) {
    res.status(400).json({ status: "error", message: "Error" });
  }
};

exports.addNewProduct = async (req, res) => {
  console.log(req.body.data);
  try {
    const { name, price, img, category } = req.body.data;
    const product = new Product({
      name,
      price,
      img,
      category,
    });
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    res.status(400).json({ status: "error", message: error });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const filter = {};
    const allProducts = await Product.find(filter);
    // console.log("allProducts:", allProducts);
    res.status(200).json({ allProducts });
  } catch (error) {
    res.status(400).json({ status: "error", message: "error" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.category;
    console.log(categoryId);
    const allProducts = await Product.find({ category: categoryId }).populate(
      "category"
    );
    // console.log("allProducts:", allProducts);
    res.status(200).json({ allProducts });
  } catch (error) {
    res.status(400).json({ status: "error", message: "error" });
  }
};

exports.getProductsFromSearch = async (req, res) => {
  console.log("HERE");
  try {
    const searchQ = req.params.searchQuery;

    console.log(searchQ);
    const productsFromSearch = await Product.find({
      name: { $regex: searchQ, $options: "i" },
    });
    // console.log("allProducts:", productsFromSearch);
    res.status(200).json({ productsFromSearch });
  } catch (error) {
    res.status(400).json({ status: "error", message: "error" });
  }
};
