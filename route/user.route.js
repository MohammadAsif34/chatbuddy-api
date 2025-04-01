import express from "express";
import Users from "../models/users.model.js";
import mongoose from "mongoose";

import {
  loginedUser,
  currChat,
  addContact,
  currUserContact,
} from "../controllers/user.controller.js";

const router = express.Router();

// get info of logined user
router.post("/:id/user", loginedUser);

// get all contacts of currentUSer  which contains contactId, chatId
router.post("/:id/chats", currChat);

// get current user contacts
router.post("/:id/contacts", currUserContact);

router.post("/addContact", addContact);

//get client by post
router.post("/client", async (req, res) => {
  try {
    const { item } = req.body;
    const userId = item;
    console.log(userId);

    if (!userId) return res.send("provide userId" + userId);
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.send("invalid userId format");
    const user = await Users.findById(new mongoose.Types.ObjectId(userId));
    if (!user) return res.send("user not found");
    const { _id, name, avatar, about, isOnline, phone } = user._doc;
    const data = {
      _id,
      name,
      phone,
      avatar,
      about,
      isOnline,
    };
    res.send(data);
  } catch (error) {
    res.send("error" + error);
  }
});

//get single user by post

// to get all users
router.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
    console.log("users found");
  } catch (error) {
    console.log(error);
  }
});
// to get single user by ID
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    if (user === null) return res.json("user not found");
    console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

export default router;
