const createError = require("http-errors");

const { successResponse } = require("./responseController");
const ChatModel = require("../models/chatModel");
//
//
// POST: /api/chat
const handleCreateChat = async (req, res, next) => {
  try {
    const { senderId, receiverId } = req.body;
    if (!senderId || !receiverId) {
      throw createError(404, "Please input sender and receiver id");
    }

    // Check if a chat already exists between the sender and receiver
    const existingChat = await ChatModel.findOne({
      members: { $all: [senderId, receiverId] },
    });
    if (existingChat) {
      throw createError(400, "Chat already exists between sender and receiver");
    }

    const newChat = await ChatModel.create({ members: [senderId, receiverId] });
    if (!newChat) {
      throw createError(401, "Chat not created");
    }
    successResponse(res, {
      statusCode: 200,
      message: "Chat was created successfully",
      payload: newChat,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST: /api/chat/:userId
const handleUserChat = async (req, res, next) => {
  try {
    const { userId } = req.params;
    if (!userId) throw createError(404, "Invalid user id");

    const userChat = await ChatModel.find({ members: { $in: [userId] } });
    if (!userChat || userChat.length === 0)
      throw createError(404, "Chat not found");

    successResponse(res, {
      statusCode: 200,
      message: "User chat list fethced successfully",
      payload: userChat,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// POST: /api/chat
const handleFindChat = async (req, res, next) => {
  try {
    const { firstId, secondId } = req.params;
    if (!firstId || !secondId)
      throw createError(404, "Please provide both id's");

    const chat = await ChatModel.findOne({
      members: { $all: [firstId, secondId] },
    });
    if (!chat || chat.length === 0) throw createError(404, "Chat not found");

    successResponse(res, {
      statusCode: 200,
      message: "Chats was fatched successfully",
      payload: chat,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// DELETE: /api/chat
const handleDeleteChat = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    if (!chatId) throw createError(404, "Please provide chat id's");

    const deletedChat = await ChatModel.findOneAndDelete(
      { _id: chatId },
      { new: true }
    );
    if (!deletedChat || deletedChat.length === 0)
      throw createError(404, "Chat not deleted");

    successResponse(res, {
      statusCode: 200,
      message: "Chats was deleted successfully",
      payload: deletedChat,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Exporting module
module.exports = {
  handleCreateChat,
  handleUserChat,
  handleFindChat,
  handleDeleteChat,
};
