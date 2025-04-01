import Message from "../models/messages.model.js";
import Chats from "../models/chats.model.js";

//post message
export const sendMssg = async (req, res) => {
  try {
    const { chatId, sender, mssg } = req.body;
    const newMssg = new Message({ sender, mssg });

    console.log(chatId, sender, mssg);
    const chat = await Chats.findById(chatId);
    await newMssg.save();
    chat.chatHistory.push(newMssg._id);
    await chat.save();

    // // const respo = await chat.save();
    res.json("done");
    // res.json({ mssg: newMssg, chat: chat });
  } catch (error) {
    console.log("error while mssg sening :: ", error);
  }
};

//get message by chatId
export const getMssg = async (req, res) => {
  try {
    const chatId = req.params.id;
    if (!chatId) return res.json("error chatID");
    const chat = await Chats.findById(chatId);
    if (!chat) return res.json("invalid chatID");
    const allMssg = [];
    for (const mssg of chat.chatHistory) {
      const message = await Message.findById(mssg);
      if (message) {
        allMssg.push(message);
      }
    }

    res.json(allMssg);
  } catch (error) {
    console.log("error while mssg fetch :: ", error);
  }
};
