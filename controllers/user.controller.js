import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import Users from "../models/users.model.js";

// user login
export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ phone: req.body.phone });
    console.log(user);
    if (!user) return res.json("user not found");

    const correct = bcrypt.compareSync(req.body.password, user.password);
    if (!correct) return res.json("incorrect user and password");

    const token = jwt.sign(
      {
        id: user._id,
        isLogin: user.isLogin,
      },
      process.env.JWT_TOKEN
    );
    const { password, ...info } = user._doc;
    info.isLogin = true;

    res
      .cookie("accessToken", token, {
        httpOnly: false,
        secure: "development",
        sameSite: "Strict",
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      })
      .status(200)
      .send(info);

    // res.json({ "login successful": user });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

// current user logout
export const logout = async (req, res) => {
  res.json("logout successfully");
};

// new user create
export const register = async (req, res) => {
  try {
    const user = await Users.findOne({ phone: req.body.phone });
    console.log(user);
    if (user) return res.json("already registered");

    if (req.body.phone.toString().length == 10) {
      const hashPassword = bcrypt.hashSync(req.body.password, 8);
      const newUser = new Users({ ...req.body, password: hashPassword });
      console.log(newUser);
      await newUser.save();
      res.json("registered successfull");
    } else {
      res.json("phone number must be 10 digit");
    }
  } catch (error) {
    return res.json("error", error);
  }
};
