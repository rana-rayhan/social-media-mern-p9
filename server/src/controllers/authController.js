const { createJsonWebToken } = require("../helpers/createJsonWebToken");
const { jwtActivationKey } = require("../secret");
const { createUser, loginUser } = require("../services/userServices");
const { successResponse } = require("./responseController");
//
//
// POST: /api/users
const handleRegisterUser = async (req, res, next) => {
  try {
    const { name, email, password, image, coverImage } = req.body;

    // process register with service
    const userData = { name, email, password, image, coverImage };
    const newUser = await createUser(userData);

    successResponse(res, {
      statusCode: 200,
      message: "User was created successfully",
      payload: newUser,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST: /api/users
const handleLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userData = { email, password };
    const user = await loginUser(userData);

    const token = createJsonWebToken(
      { email, id: user._id },
      jwtActivationKey,
      "3d"
    );
    // setAccessTokenCookie(res, token);

    successResponse(res, {
      statusCode: 200,
      message: "User was created successfully",
      payload: { user, token: "Bearer " + token },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  handleRegisterUser,
  handleLogin,
};
