const authRouter = require("express").Router();

const {
  handleRegisterUser,
  handleLogin,
} = require("../controllers/authController");
const { isLoggedOut } = require("../middlewares/auth");
const { runValidation } = require("../validators");
const { validateCreateUser, validateLogin } = require("../validators/auth");
//
//
// POST: /api/users/register
authRouter.post(
  "/register",
  validateCreateUser,
  runValidation,
  handleRegisterUser
);
//
//
// POST: /api/users/login
authRouter.post(
  "/login",
  validateLogin,
  runValidation,
  isLoggedOut,
  handleLogin
);
//
//
//
module.exports = authRouter;
