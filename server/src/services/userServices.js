const User = require("../models/userModel");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");
//
//
//  POST: /api/users Register service
const createUser = async (userData) => {
  const { name, email, password, image, coverImage } = userData;

  if (image && image.size && coverImage.size > 1024 * 1024 * 2) {
    throw createError(400, "Image size is too big, it should be max 2mb ");
  }
  // // convert image to buffer string
  // const imageBufferString = image.buffer.toString("base64");

  const userExist = await User.exists({ email: email });
  if (userExist)
    throw createError(409, "User is already exist, please sign up");

  const newUser = await User.create({
    name,
    email,
    password,
    image,
    coverImage,
  });

  return newUser;
};
//
//
// POST: /api/users Login service
const loginUser = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });
  if (!user) throw createError(404, "User is not exist");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw createError(404, "User email or password dose not match");

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;

  return userWithoutPassword;
};
//
//
//
module.exports = {
  createUser,
  loginUser,
};
