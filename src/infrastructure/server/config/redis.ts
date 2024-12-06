import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();
const redis_url: string = process.env.redis_url

const client = createClient({
  url: redis_url,
});

export const connectReds = async () => {
  await client.connect();
};

client.on("connect", () => {
  console.log("Connected to Redis");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

export const redisDb = client;
