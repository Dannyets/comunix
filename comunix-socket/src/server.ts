import WebSocket from "ws";
const { PORT } = process.env;

export const wss = new WebSocket.Server({
  port: PORT ? parseInt(PORT) : 8087,
});

console.log(`created websocket server ${JSON.stringify(wss.address())} on port ${PORT}`)

export const initServerEvents = () => {
  console.log("initializing server events");
  wss.on("connection", (ws) => {
    console.log("new connection");
    ws.on("message", (data: string) => {
      ws.send(JSON.stringify(data));
    });
  });
};
