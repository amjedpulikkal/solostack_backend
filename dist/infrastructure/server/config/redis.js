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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDb = exports.connectReds = void 0;
const redis_1 = require("redis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const redis_url = process.env.redis_url;
const client = (0, redis_1.createClient)({
    url: redis_url,
});
const connectReds = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
});
exports.connectReds = connectReds;
client.on("connect", () => {
    console.log("Connected to Redis");
});
client.on("error", (err) => {
    console.error("Redis error:", err);
});
exports.redisDb = client;
