import mongoose from "mongoose";
import Chats from "../models/chats.model.js";
import Users from "../models/users.model.js";
import Message from "../models/messages.model.js";

export const chats = async (req, res) => {
  try {
    const { currId, contactId } = req.body;
    const { contacts } = await Users.findById(currId);

    let chatId;
    for (const con of contacts) {
      if (contactId == con.userId.toString()) {
        chatId = con.chatId;
        console.log("matched");
        break;
      }
    }
    // console.log(typeof contactId);
    const messages = [];
    const chats = await Chats.findById(chatId);
    for (const mssg of chats.chatHistory) {
      const message = await Message.findById(mssg);
      messages.push(message);
      //   console.log(message);
    }
    res.json(messages);
  } catch (error) {
    res.json(error.message);
  }
};
