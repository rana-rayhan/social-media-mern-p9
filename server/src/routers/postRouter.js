const {
  handleGetPosts,
  handleCreatePost,
  handleGetPostById,
  handleUpdatePost,
  handleDeletePost,
  handleLikes,
  handleTimelinePosts,
  handleGetUserPost,
} = require("../controllers/postController");
//
const postRouter = require("express").Router();
//
//
// view all post
postRouter.get("/", handleGetPosts);
//
// view single post
postRouter.get("/user/:id", handleGetUserPost);
//
// view single post
postRouter.get("/:id", handleGetPostById);
//
// create a post
postRouter.post("/", handleCreatePost);
//
// update post
postRouter.put("/:id", handleUpdatePost);
//
// delete post
postRouter.delete("/:id", handleDeletePost);
//
// like post
postRouter.put("/like/:id", handleLikes);
//
// get timeline post
postRouter.get("/timelinepost/:id", handleTimelinePosts);
//
//
//
module.exports = postRouter;
