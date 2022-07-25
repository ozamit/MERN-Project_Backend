const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

router.route("/register").put(userController.register);
router.route("/login").post(userController.login);
router.route("/getUserById/:id").get(userController.getUserById);

module.exports = router;
