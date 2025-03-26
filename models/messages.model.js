import mongoose from "mongoose";

const messagesSchema = mongoose.Schema(
  {
    sender: { type: String, required: true, unique: true },
    chatId: { type: String, required: true },
    content: String,
    messageType: { type: String, enum: ["text"], default: "text" },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "text",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.Schema("Messages", messagesSchema);
