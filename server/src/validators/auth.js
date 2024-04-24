const { body } = require("express-validator");
//
//
// validation for user registration
const validateCreateUser = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("Name length must be 3-31 characters."),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be min 6 characters.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?8])[A-Za-z\d@$!%*?8]+$/
    )
    .withMessage(
      "Password must contain uppercase, lowercase, number, special char."
    ),
];
//
//
// validation for user login
const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be min 6 characters!")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?8])[A-Za-z\d@$!%*?8]+$/
    )
    .withMessage(
      "Password must contain uppercase, lowercase, number, special char."
    ),
];
//
//
//
module.exports = {
  validateCreateUser,
  validateLogin,
};
