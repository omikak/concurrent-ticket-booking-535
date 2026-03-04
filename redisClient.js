// redisClient.js
import Redis from "ioredis";

// Upstash REST credentials (from your environment variables)
const redis = new Redis(process.env.UPSTASH_REDIS_REST_URL, {
  token: process.env.UPSTASH_REDIS_REST_TOKEN
});

export default redis;