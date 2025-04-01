import Users from "../models/users.model.js";
import Chats from "../models/chats.model.js";

export const loginedUser = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) return res.send("something error! try again ");

    const user = await Users.findById(userId).select("-password");
    if (!user) return res.send("user not found");

    res.json(user);
  } catch (error) {
    res.send("error" + error);
  }
};

export const currChat = async (req, res) => {
  async (req, res) => {
    try {
      const userId = req.params.id;
      //   const resp = await Users.findById(userId);

      res.json(userId);
    } catch (error) {
      res.json("erro");
    }
  };
};

export const addContact = async (req, res) => {
  try {
    const { userId, newContact } = req.body;
    const currUser = await Users.findOne({ phone: userId });

    const newUser = await Users.findOne({ phone: newContact });
    if (newUser === null) return res.json("user not found");

    for (const con of currUser.contacts) {
      if (con.userId.toString() === newUser._id.toString())
        return res.json("chats exist");
    }

    const newChat = new Chats();
    newChat.participant.push(currUser._id);
    newChat.participant.push(newUser._id);

    const newCont = {
      userId: newUser._id,
      chatId: newChat._id,
    };
    currUser.contacts.push(newCont);
    await newChat.save();
    await currUser.save();

    res.json("done");
  } catch (error) {
    res.json(error.message);
  }
};

export const currUserContact = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await Users.findById(userId);
    const allContacts = [];
    for (const con of user.contacts) {
      const { _id, name, phone, avatar, about, isOnline } =
        await Users.findById(con.userId);
      const chatId = con.chatId;
      const data = { _id, name, phone, avatar, about, isOnline, chatId };
      allContacts.push(data);
    }
    res.json(allContacts);
  } catch (error) {
    console.log(error.message);
    res.json(error.message);
  }
};
