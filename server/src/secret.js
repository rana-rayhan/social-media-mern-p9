require("dotenv").config();
//
// server port
const SERVER_PORT = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGO_ATLAS_URL;
const default_demo_id = process.env.DEFAULT_DEMO_ID;
const jwtActivationKey = process.env.JWT_ACTIVATION_KEY;
//
//
//
module.exports = {
  SERVER_PORT,
  mongodbUrl,
  jwtActivationKey,
  default_demo_id,
};
