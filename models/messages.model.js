import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, required: true },
    mssg: { type: String, required: true },
    messageType: {
      type: String,
      enum: ["text", "file", "document", "photo"],
      default: "text",
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "read"],
      default: "sent",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
