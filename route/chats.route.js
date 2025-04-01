import express from "express";
const router = express.Router();

import { chats } from "../controllers/chats.controller.js";

router.post("/:id/chats", chats);

export default router;
