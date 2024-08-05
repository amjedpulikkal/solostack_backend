"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisDb = exports.connectReds = void 0;
const redis_1 = require("redis");
const client = (0, redis_1.createClient)({
    url: 'redis://localhost:6379'
});
const connectReds = () => {
    client.connect();
};
exports.connectReds = connectReds;
client.on('connect', () => {
    console.log('Connected to Redis');
});
client.on('error', (err) => {
    console.error('Redis error:', err);
});
exports.redisDb = client;
