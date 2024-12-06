"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackgroundQueue = void 0;
const bull_1 = __importDefault(require("bull"));
const bull_board_1 = require("bull-board");
class BackgroundQueue {
    constructor() {
        this.backgroundQueue = new bull_1.default("backgroundTasks", {
            redis: {
                host: "127.0.0.1",
                port: 6379,
            },
        });
        (0, bull_board_1.setQueues)([new bull_board_1.BullAdapter(this.backgroundQueue)]);
    }
    addToQueue(data) {
        this.backgroundQueue.add(data, {
            attempts: 3,
            backoff: 5000,
        });
    }
    addEmailJobToQueue(data) {
        this.addToQueue(Object.assign(Object.assign({}, data), { task: "email" }));
    }
    addWebPushJobToQueue(data) {
        this.addToQueue(Object.assign(Object.assign({}, data), { task: "webPush" }));
    }
}
exports.BackgroundQueue = BackgroundQueue;
