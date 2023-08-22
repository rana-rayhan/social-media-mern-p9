require("dotenv").config();
//
// server port
const SERVER_PORT = process.env.PORT || 5000;
const mongodbUrl = process.env.MONGO_ATLAS_URL;
const jwtActivationKey = "randomtextforjwtactivationorsecrectkey";
//
//
//
module.exports = {
  SERVER_PORT,
  mongodbUrl,
  jwtActivationKey,
};
