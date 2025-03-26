import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import userRoute from "./route/user.route.js";
import authRoute from "./route/auth.route.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(
  cors({ origin: "https://mohammadasif34.github.io", credentials: true })
);
// app.use(cors());

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

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

app.listen(PORT, (err) => {
  connectDB();
  if (!err) return console.log(`server is running at http://localhost:${PORT}`);
  else return console.log(err);
});
