const MessageModel = require("../models/messageModel");
const createError = require("http-errors");

const { successResponse } = require("./responseController");
//
//
// POST: api/messages
const handleAddMessage = async (req, res, next) => {
  try {
    const { chatId, senderId, text } = req.body;
    if (!chatId || !senderId) throw createError(404, "Message not added");

    const message = await MessageModel.create({
      chatId,
      senderId,
      text,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Messages was added successfully",
      payload: message,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// GET: api/messages/:chatId
const handleGetMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const messages = await MessageModel.find({ chatId });

    successResponse(res, {
      statusCode: 200,
      message: "Messages was returned successfully",
      payload: messages,
    });
  } catch (error) {
    next(error);
  }
};
//
//
// Exporting modules
module.exports = {
  handleAddMessage,
  handleGetMessage,
};
