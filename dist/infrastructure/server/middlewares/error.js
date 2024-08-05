"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(message = "Internal Server Error", statusCode) {
        super(message);
        this.statusCode = statusCode || 500;
        Error.captureStackTrace(this, ErrorHandler);
    }
}
exports.ErrorHandler = ErrorHandler;
