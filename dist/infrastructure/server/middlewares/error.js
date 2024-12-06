"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
const injection_1 = require("../router/injections/injection");
class ErrorHandler extends Error {
    constructor(message = "Internal Server Error", statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        Error.captureStackTrace(this, ErrorHandler);
        injection_1.logger.logDebug(message);
    }
}
exports.ErrorHandler = ErrorHandler;
