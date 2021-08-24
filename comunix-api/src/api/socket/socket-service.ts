import { redisPublisher } from "../../clients";
import { Payload } from "../../models";

const WS_CHANNEL = "ws:messages";

export const send = async (payload: Payload, count = 1) => {
  const { message, type } = payload;
  const strPayload = JSON.stringify({ message, type });
  console.log('Sending message to ws servers', { payload, count });
  const publishTasks = Array(count).fill(0).map(
    () =>
      new Promise((resolve, reject) => {
        redisPublisher.publish(WS_CHANNEL, strPayload, (err, reply) => {
          if (err) {
            return reject(err);
          }

          return resolve(reply);
        });
      })
  );
  return Promise.all(publishTasks);
};
