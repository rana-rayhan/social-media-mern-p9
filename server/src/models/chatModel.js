const { Schema, model } = require("mongoose");
//
//
// Chat schema
const chatSchema = new Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);
//
//
// Chat model
const ChatModel = model("Chat", chatSchema);
module.exports = ChatModel;
