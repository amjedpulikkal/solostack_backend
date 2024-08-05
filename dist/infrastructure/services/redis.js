"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedisDb = void 0;
const redis_1 = require("../../infrastructure/server/config/redis");
class RedisDb {
    setData() {
        return __awaiter(this, arguments, void 0, function* (key = "key", value) {
            try {
                const serializedValue = JSON.stringify(value);
                yield redis_1.redisDb.set(key, serializedValue);
                console.log(`Key ${key} set successfully`, value);
            }
            catch (error) {
                console.error(`Error setting key ${key}:`, error);
                throw error;
            }
        });
    }
    getData(key) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield redis_1.redisDb.get(key);
                if (result) {
                    return JSON.parse(result);
                }
                return null;
            }
            catch (error) {
                console.error(`Error getting key ${key}:`, error);
                throw error;
            }
        });
    }
    setDataWithEx(key, value, ttl) {
        return __awaiter(this, void 0, void 0, function* () {
            const serializedValue = JSON.stringify(value);
            // await redisDb.set(key, serializedValue, "EX", ttl);
        });
    }
}
exports.RedisDb = RedisDb;
