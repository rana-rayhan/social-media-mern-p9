const { handleAddMessage, handleGetMessage } = require("../controllers/messageController");

const messageRouter = require("express").Router();
//
//
//
messageRouter.post("/", handleAddMessage);
messageRouter.get("/:chatId", handleGetMessage);
//
//
//
module.exports = messageRouter;
