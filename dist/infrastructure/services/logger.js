"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
class Logger {
    constructor() {
        this.logger = winston_1.default.createLogger({
            level: "debug",
            format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.printf(({ timestamp, level, message }) => {
                return `${timestamp} [${level.toUpperCase()}]: ${message}`;
            })),
            transports: [
                new winston_1.default.transports.File({ filename: "app.log", level: "debug", }),
                new winston_1.default.transports.Console({ level: "debug" }),
            ],
        });
    }
    logDebug(error) {
        this.logger.debug(error);
    }
}
exports.Logger = Logger;
