import { createClient } from "redis";

let redisClient;

if (!global.redisClient) {
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.on("error", (err) => console.error("Redis Client Error", err));
  await redisClient.connect();
  global.redisClient = redisClient;
} else {
  redisClient = global.redisClient;
}

export default redisClient;