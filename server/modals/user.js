const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      min: 6,
      max: 80,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 200,
    },
    avatar: {
      type: String,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "social-network-users",
  }
);

module.exports = mongoose.model("User", User);
