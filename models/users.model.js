import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dzgy0hfu1/image/upload/v1743103845/default_avatar.png",
    },
    about: { type: String, default: "I am busy!" },
    isOnline: { type: Boolean, default: false },
    isLogin: { type: Boolean, default: false },
    contacts: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chats" },
      },
    ],
    lastSeen: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
