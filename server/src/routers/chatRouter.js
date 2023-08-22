const chatRouter = require("express").Router();

const {
  getUserChat,
  handleCreateChat,
  handleUserChat,
  handleFindChat,
  handleDeleteChat,
} = require("../controllers/chatController");
//
//
// GET: /api/chat
chatRouter.post("/", handleCreateChat);
chatRouter.get("/:userId", handleUserChat);
chatRouter.get("/find/:firstId/:secondId", handleFindChat);
chatRouter.delete("/:chatId", handleDeleteChat);
//
//
// Exporting module
module.exports = chatRouter;
