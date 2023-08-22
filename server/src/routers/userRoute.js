const userRouter = require("express").Router();

const {
  handleViewUsers,
  handleSearchUser,
  handleLoggedUsers,
  handleUpdateUser,
  handleDeleteUser,
  handleFollowUser,
  handleUnFollowUser,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/auth");
//
//
// GET: /api/users
userRouter.get("/", handleViewUsers);
userRouter.get("/:id", handleLoggedUsers);
userRouter.get("/search", isLoggedIn, handleSearchUser);

userRouter.put("/:id", handleUpdateUser);
userRouter.delete("/:id", handleDeleteUser);

userRouter.put("/follow/:id", handleFollowUser);
userRouter.put("/unfollow/:id", handleUnFollowUser);
//
//
//
module.exports = userRouter;
