import { logger } from "../router/injections/injection";

export class ErrorHandler extends Error {
    statusCode: number;
    constructor(message = "Internal Server Error",statusCode?: number) {
      super(message);
      this.statusCode = statusCode || 500
      Error.captureStackTrace(this, ErrorHandler);
      logger.logDebug(message)
    }
  }
  
