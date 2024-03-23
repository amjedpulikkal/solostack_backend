export class ErrorHandler extends Error {
    statusCode: number;
    constructor(statusCode?: number,message = "Internal Server Error") {
      super(message);
      this.statusCode = statusCode || 500
      Error.captureStackTrace(this, ErrorHandler);
    }
  
  }
  
