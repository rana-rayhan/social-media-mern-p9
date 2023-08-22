const { Schema, model } = require("mongoose");
//
//
// Message schema
const messageSchema = new Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);
//
//
// Message model
const MessageModel = model("Message", messageSchema);
module.exports = MessageModel;
