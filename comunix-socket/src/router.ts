import { WS_CHANNEL } from "./consts";
import { redisSubscriber } from "./clients";
import { Payload, MessageType } from "./models";
import { handleBroadcast, handleSingle } from "./handlers";

const routeHandlers = {
  [MessageType.Single]: handleSingle,
  [MessageType.Broadcast]: handleBroadcast,
};

export const initMessageRouter = () => {
  console.log("initializing router");
  redisSubscriber.on("message", (channel, message) => {
    if (channel === WS_CHANNEL) {
      console.log("message recieved, begin routing", { message });
      try {
        const payload: Payload = JSON.parse(message);
        const routeHandler = routeHandlers[payload.type];
        routeHandler(payload.message);
        console.log("Handled message succesfully.");
      } catch (error) {
        console.log("Failed to handle message", { error, message });
      }
    }
  });

  redisSubscriber.subscribe(WS_CHANNEL);
};
