const { seedUser } = require("../controllers/seedController");
const seedRouter = require("express").Router();
//
//
// GET: /api/seed/users seed users
seedRouter.get("/users", seedUser);
//
//
module.exports = seedRouter;
