const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "please insert First name"],
  },
  lastName: {
    type: String,
    required: [true, "please insert Last name"],
  },
  username: {
    type: String,
    required: [true, "please insert username"],
  },
  email: {
    type: String,
    required: [true, "please insert email"],
  },
  password: {
    type: String,
    required: [true, "please insert password"],
  },
  city: {
    type: String,
    required: [true, "please insert city"],
  },
  street: {
    type: String,
    required: [true, "please insert street"],
  },
  manager: {
    type: Boolean,
    default: false,
  },
});

const User = model("User", userSchema);
module.exports = User;
