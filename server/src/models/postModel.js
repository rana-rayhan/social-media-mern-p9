const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    desc: String,
    likes: [],
    image: {
      type: String,
      default: "default.jpg",
    },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Posts", postSchema);
module.exports = PostModel;
