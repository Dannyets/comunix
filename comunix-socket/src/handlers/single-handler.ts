import WebSocket from "ws";
import { wss } from "../server";

const getRandomAvailableSocket = () => {
  const clients = Array.from(wss.clients).filter(client => client?.readyState === WebSocket.OPEN);
  
  if(clients.length === 0){
      return null;
  }

  const randomIndex = Math.floor(Math.random() * clients.length);

  return clients[randomIndex];
};

export const handleSingle = (message: string) => {
  const client = getRandomAvailableSocket();
  if (!client) {
    console.log("No available clients to handle single message", { message });
    return;
  }
  console.log("handle single is handling message", { message });
  return client.send(message);
};
