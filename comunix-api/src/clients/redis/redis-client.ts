import redis from "redis";

const { REDIS_HOST } = process.env;

export const redisSubscriber = redis.createClient({
  url: `redis://${REDIS_HOST ?? 'localhost:6379'}`
});

export const redisPublisher = redisSubscriber.duplicate();

// subscriber.on("message", (channel, message) => {
//   console.log(`Message from: ${channel}, ${message}`);
// });