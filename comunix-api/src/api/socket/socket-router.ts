import express from "express";
import * as socketController from "./socket-controller";
import { authMiddleware } from '../../middlewares';

export const socketRouter = express.Router();

socketRouter
  .post("/spin", authMiddleware, socketController.spin)
  .post("/wild", authMiddleware, socketController.wild)
  .post("/blast", authMiddleware, socketController.blast)