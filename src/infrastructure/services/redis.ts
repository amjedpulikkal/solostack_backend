import { IRedisDb } from "@interfaces/services/interface";
import { redisDb } from "../../infrastructure/server/config/redis";

export class RedisDb implements IRedisDb {
  async setData(key: string = "key", value: any): Promise<void> {
    try {
      const serializedValue = JSON.stringify(value);
      await redisDb.set(key, serializedValue);
      console.log(`Key ${key} set successfully`, value);
    } catch (error) {
      console.error(`Error setting key ${key}:`, error);
      throw error;
    }
  }

  async getData(key: string): Promise<any> {
    try {
      const result = await redisDb.get(key)
      if (result) {
        return JSON.parse(result);
      }
      return null;
    } catch (error) {
      console.error(`Error getting key ${key}:`, error);
      throw error;
    }
  }
  async setDataWithEx(key: string, value: any, ttl: number): Promise<void> {
    const serializedValue = JSON.stringify(value);
    // await redisDb.set(key, serializedValue, "EX", ttl);
  }
}
