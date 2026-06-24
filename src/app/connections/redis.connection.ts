import { createClient } from "redis";
import { env } from "../../validate.env.js";

const redisClient = createClient({
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    socket: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT
    }
});


export const connectToRedis = async () => {
  try {
    await redisClient.connect();
    console.log(`REDIS CONNECTED SUCCESSFULLY`);
  } catch(err) {
    console.error(`COULD NOT CONNECT TO REDIS...`);
    throw err;
  }
};