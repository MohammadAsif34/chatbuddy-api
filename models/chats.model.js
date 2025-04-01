import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema(
  {
    participant: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    chatHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  },
  { timestamps: true }
);
chatsSchema.path("participant").validate(function (value) {
  return value.length === 2;
}, "this is private chat");
export default mongoose.model("Chats", chatsSchema);
