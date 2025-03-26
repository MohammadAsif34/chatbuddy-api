import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
    about: { type: String, default: "" },
    isOnline: { type: Boolean, default: false },
    isLogin: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

export default mongoose.model("Users", UserSchema);
