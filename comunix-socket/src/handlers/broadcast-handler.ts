import WebSocket from "ws";
import { wss } from "../server";

export const handleBroadcast = (message: string) => {
  if (!wss.clients.size) {
    console.log("No available clients to handle boradcast message", {
      message,
    });
    return;
  }

  console.log("handle broadcast is handling message", { message });
  wss.clients.forEach((client) => {
    if (client?.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};
