const User = require("../models/userModel");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
//
//
// GET: /api/users
const handleViewUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    if (!users || users.length === 0)
      throw createError(
        404,
        "User date fatched unsuccessfull or no users avilable"
      );

    successResponse(res, {
      statusCode: 200,
      message: "User was returned",
      payload: users,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET: /api/users/:id
const handleLoggedUsers = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id }).select("-password");
    if (!user) throw createError(404, "User date fatched unsuccessfull");

    successResponse(res, {
      statusCode: 200,
      message: "User was returned",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET: /api/users  search
const handleSearchUser = async (req, res, next) => {
  try {
    // variable for responsive
    const search = req.query.search || "";
    const searchRegExp = new RegExp(".*" + search + ".*", "i");
    const { id } = req.user;

    // filter user by admin needs --**
    const filter = {
      _id: { $ne: id },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
      ],
    };
    // return user without password --**
    const options = { password: 0 };
    // find user from database --**
    const users = await User.find(filter, options);
    // if not user throw an error
    if (!users || users.length === 0) throw createError(404, "No user found");

    // return users into response controller--**
    return successResponse(res, {
      statusCode: 200,
      message: "Users are returned successfully",
      payload: users,
    });
  } catch (error) {
    // if any error then catch the error into next(error) -- app.js
    next(error);
  }
};
//
//
//update user
const handleUpdateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    await findWithId(User, id);
    await findWithId(User, userId);

    if (id !== userId) {
      throw createError(
        403,
        "Access Denied! you can only update your own profile"
      );
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      { ...req.body },
      {
        new: true,
      }
    ).select("-password");
    if (!user) {
      createError(404, "Error created while updating user info");
    }
    successResponse(res, {
      statusCode: 200,
      message: "User Updated successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
//
//
//delete workout
const handleDeleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    await findWithId(User, id);

    const user = await User.findOneAndDelete({ _id: id });
    if (!user) {
      throw createError(402, "User delete unsuccessfull");
    }
    successResponse(res, {
      statusCode: 200,
      message: "User deleted successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Follow a User
const handleFollowUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { _id } = req.body;
    if (!_id) throw createError(404, "current user id is required");
    if (_id === id) {
      throw createError(403, "Action forbidden, you can't follow yourself");
    }
    const followUser = await findWithId(User, id);
    const followingUser = await findWithId(User, _id);

    if (followUser.followers.includes(_id)) {
      throw createError(403, "User is already followed by you");
    }
    await followUser.updateOne({ $push: { followers: _id } });
    await followingUser.updateOne({ $push: { following: id } });
    return successResponse(res, {
      statusCode: 200,
      message: "User followed",
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Follow a User
const handleUnFollowUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { _id } = req.body;
    if (!_id) throw createError(404, "current user id is required");
    if (_id === id) {
      throw createError(403, "Action forbidden, you can't follow yourself");
    }
    const followUser = await findWithId(User, id);
    const followingUser = await findWithId(User, _id);

    if (!followUser.followers.includes(_id)) {
      throw createError(403, "User is not followed by you");
    }
    await followUser.updateOne({ $pull: { followers: _id } });
    await followingUser.updateOne({ $pull: { following: id } });
    return successResponse(res, {
      statusCode: 200,
      message: "User is Unfollowed",
    });
  } catch (error) {
    next(error);
  }
};
//
// Exports modules
module.exports = {
  handleViewUsers,
  handleLoggedUsers,
  handleSearchUser,
  handleUpdateUser,
  handleDeleteUser,
  handleFollowUser,
  handleUnFollowUser,
};
