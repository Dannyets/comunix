import * as socketService from "./socket-service";
import { MessageType } from "../../models";

export const spin = async (req, res, next) => {
  const { body } = req;
  const { message } = body;
  console.log('Sending spin message');
  try {
    const response = await socketService.send(
      { message, type: MessageType.Single },
      1
    );
    return res.status(200).json({
      message: "Spinned message to a random user",
      response,
    });
  } catch (err) {
    return next(err);
  }
};

export const wild = async (req, res, next) => {
  const { body } = req;
  const { message, numberOfRandomUsers } = body;
  console.log('Sending wild message');
  try {
    await socketService.send(
      { message, type: MessageType.Single },
      numberOfRandomUsers ?? 1
    );
    return res.status(200).json({
      message: `Spinned message to ${numberOfRandomUsers} random users`,
    });
  } catch (err) {
    return next(err);
  }
};

export const blast = async (req, res, next) => {
  const { body } = req;
  const { message } = body;
  console.log('Sending blast message');
  try {
    await socketService.send(
      { message, type: MessageType.Broadcast },
      1
    );
    return res.status(200).json({
      message: `Spinned message to all users`
    });
  } catch (err) {
    return next(err);
  }
};
