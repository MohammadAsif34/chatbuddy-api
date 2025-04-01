import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./route/user.route.js";
import authRoute from "./route/auth.route.js";
import chatsRoute from "./route/chats.route.js";
import messageRoute from "./route/message.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://mohammadasif34.github.io"],
    credentials: true,
  })
);

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log("mongoDB connected"))
      .catch((err) => console.log(err.errorResponse));
  } catch (error) {
    console.log(`mongoDB connecting failed :: ${error}`);
  }
};

app.get("/", (req, res) => {
  res.send("chatbuddy backened is working properly.");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/chats", chatsRoute);
app.use("/api/message", messageRoute);

app.listen(PORT, (err) => {
  connectDB();
  if (!err) return console.log(`server is running at http://localhost:${PORT}`);
  else return console.log(err);
});
