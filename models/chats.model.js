import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
  {
    participants: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    lastMessages: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Messages",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.Schema("Chats", chatsSchema);
