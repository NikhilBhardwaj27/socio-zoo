const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Profile = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bio: {
      type: String,
    },
    relationshipStatus: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    birthday: {
      type: String,
    },
    hobbies: {
      type: [String],
      required: true,
    },
    website: {
      type: String,
    },
    gender: {
      type: String,
    },
    age: {
      type: Number,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: 0,
      },
    ],
    basicDetails: [
      {
        school: {
          type: String,
        },
        college: {
          type: String,
        },
        job: {
          type: String,
        },
      },
    ],
    social: {
      youtube: {
        type: String,
      },
      linkedin: {
        type: String,
      },
      twitter: {
        type: String,
      },
      instagram: {
        type: String,
      },
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "social-network-profiles",
  }
);

module.exports = mongoose.model("Profile", Profile);
