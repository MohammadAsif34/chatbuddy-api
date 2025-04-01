import express from "express";
const router = express.Router();

import { getMssg, sendMssg } from "../controllers/message.controller.js";

router.post("/message", sendMssg);
router.post("/:id", getMssg);

export default router;
