import WebSocket from "ws";
const { SOCKET_HOST } = process.env;

const ws = new WebSocket(`ws://${SOCKET_HOST}`);

ws.on("open", function open() {
  console.log("connected");
});

ws.on("message", function incoming(data) {
  const payload = data.toString('utf8')
  console.log(`recived a message`, { payload });
});

ws.on("error", function err(err) {
  console.log({ err });
});

ws.on("ping", heartbeat);

ws.on("close", function clear() {
  //@ts-ignore
  clearTimeout(this.pingTimeout);
});

function heartbeat() {
  clearTimeout(this.pingTimeout);

  // Use `WebSocket#terminate()`, which immediately destroys the connection,
  // instead of `WebSocket#close()`, which waits for the close timer.
  // Delay should be equal to the interval at which your server
  // sends out pings plus a conservative assumption of the latency.
  this.pingTimeout = setTimeout(() => {
    this.terminate();
  }, 30000 + 1000);
}
