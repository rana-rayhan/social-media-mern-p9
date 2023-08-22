const UserModel = require("../models/userModel");
const PostModel = require("../models/postModel");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
const { findWithId } = require("../services/findItem");
//
//
// GET: view all post
const handleGetPosts = async (req, res, next) => {
  try {
    const posts = await PostModel.find({}).sort({ createdAt: -1 });
    if (!posts) {
      throw createError(404, "Post is empty or post fathcing error ");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Post was fathched successfully",
      payload: posts,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET: getting post by post id
const handleGetUserPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await PostModel.find({ userId: id });
    if (!posts) {
      throw createError(404, "This user dosen't create any post yet");
    }
    successResponse(res, {
      statusCode: 200,
      message: "User Post fatched by user id",
      payload: posts,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET: getting post by post id
const handleGetPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const posts = await findWithId(PostModel, id);

    successResponse(res, {
      statusCode: 200,
      message: "Post fatched by post id",
      payload: posts,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST: Creat new Post
const handleCreatePost = async (req, res, next) => {
  try {
    const { name, userId, desc, likes, image } = req.body;

    if (!userId) {
      throw createError(404, "Please login for share a post");
    }
    if (image && image.size && coverImage.size > 1024 * 1024 * 2) {
      throw createError(400, "Image size is too big, it should be max 2mb ");
    }

    const newPost = await PostModel.create({
      name,
      userId,
      desc,
      likes,
      image,
    });
    if (!newPost) {
      throw createError(402, "Post dosen't created");
    }
    successResponse(res, {
      statusCode: 200,
      message: "Post was created by user",
      payload: newPost,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// PUT: Update a post
const handleUpdatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await findWithId(PostModel, postId);
    if (!userId) {
      throw createError(403, "Please login");
    }
    if (post.userId !== userId) {
      throw createError(403, "Action forbidden");
    }
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: postId },
      { ...req.body },
      { new: true }
    );
    // const updatedPost = await post.findone({ $set: req.body }, { new: true });
    if (!updatedPost || updatedPost.length === 0) {
      throw createError(404, "Post dosen't updated");
    }

    successResponse(res, {
      statusCode: 200,
      message: "Post was updated",
      payload: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// delete a post
const handleDeletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const { userId } = req.body;

    const post = await findWithId(PostModel, postId);

    if (!userId) {
      throw createError(403, "Action forbidden, please login");
    }
    if (post.userId !== userId) {
      throw createError(403, "Action forbidden");
    }

    await post.deleteOne();

    successResponse(res, {
      statusCode: 200,
      message: "Post was deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
//
//
// like/unLike a post
const handleLikes = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { userId } = req.body;

    if (!userId) {
      throw createError(404, "Please login to like a post");
    }
    const post = await findWithId(PostModel, id);

    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });

      return successResponse(res, {
        statusCode: 200,
        message: "Post liked",
      });
    } else if (post.likes.includes(userId)) {
      await post.updateOne({ $pull: { likes: userId } });

      return successResponse(res, {
        statusCode: 200,
        message: "Post Unliked",
      });
    }
  } catch (error) {
    next(error);
  }
};
//
// Get Timeline POsts
const handleTimelinePosts = async (req, res, next) => {
  const userId = req.params.id;
  try {
    await findWithId(UserModel, userId);
    const currentUserPosts = await PostModel.find({ userId: userId });
    const currentUserFollowing = await UserModel.findById(userId, "following");
    const followingUserIds = currentUserFollowing.following;

    const followingPosts = await PostModel.find({
      userId: { $in: followingUserIds },
    });
    const allPosts = currentUserPosts.concat(followingPosts);
    allPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    successResponse(res, {
      statusCode: 200,
      message: "Timeline post was fatched successfully",
      payload: allPosts,
    });
  } catch (error) {
    next(error);
  }
};
//
//
//
module.exports = {
  handleGetPosts,
  handleGetUserPost,
  handleCreatePost,
  handleGetPostById,
  handleUpdatePost,
  handleDeletePost,
  handleLikes,
  handleTimelinePosts,
};
