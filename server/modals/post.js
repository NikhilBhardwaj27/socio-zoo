const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Post = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    text: {
      type: String,
      required: true,
    },
    like: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        name: {
          type: String,
        },
        avatar: {
          type: String,
        },
        text: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "social-network-posts",
  }
);

module.exports = mongoose.model("Post", Post);
