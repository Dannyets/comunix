import express from "express";
import { userRouter } from "../api/user";
import { socketRouter } from "../api/socket";

export const router = express.Router();

router.use('/user', userRouter);
router.use('/socket', socketRouter);
