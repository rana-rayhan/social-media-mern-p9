const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: {
      type: String,
      required: true,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    image: { type: String, default: "" },
    coverImage: { type: String, default: "" },
    isAdmin: { type: Boolean, required: true, default: false },
    about: { type: String, default: "About You" },
    livesin: { type: String, default: "Lives in ?" },
    worksAt: { type: String, default: "Work status" },
    relationship: { type: String, default: "Relationship status" },
    followers: [],
    following: {
      type: [String],
      default: ["64d80cb8ff59986048a21977"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
