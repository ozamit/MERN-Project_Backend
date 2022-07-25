const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 5;

function generateAccessToken(user) {
  console.log("user", user);
  delete user.password;
  return jwt.sign(user.username, process.env.JWT_SECRET);
}

exports.register = async (req, res, err) => {
  console.log(req.body.data);
  const data = req.body.data;
  console.log(data);
  const { password } = data;
  console.log(password);
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  const hashedPassword = await bcrypt.hash(password, salt);
  data.password = hashedPassword;
  const user = await User.create(data);

  res.status(201).json({ status: "success", message: user });
};

exports.login = async (req, res) => {
  console.log("login");
  console.log(req.body.data);

  const { username, password } = req.body.data;
  const user = await User.findOne({ username });
  console.log("user", user);

  if (user === null) {
    console.log("User not found");
    return res.status(403).json({ status: "error", message: "User not found" });
  }

  if (user !== null) {
    const ifPasswordMatch = await bcrypt.compare(password, user.password);

    if (ifPasswordMatch == false) {
      console.log("password doesn't match");
      return res
        .status(403)
        .json({ status: "error", message: "password don't match" });
    }

    if (ifPasswordMatch == true) {
      console.log("logged in successfully");
      const token = generateAccessToken(user);
      console.log("token", token);
      // res.cookie("token", token);
      return res.status(200).json({
        status: "success",
        message: user,
        token: token,
      });
    }
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  console.log("userId", userId);
  const user = await User.findOne({ _id: userId });
  console.log("user", user);
  res.status(201).json({ status: "success", message: user });
};
