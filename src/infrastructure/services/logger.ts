import winston from "winston";

export class Logger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      level: "debug",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.File({ filename: "app.log", level: "debug" ,}),
        new winston.transports.Console({ level: "debug" }),
      ],
    });
  }

  logDebug(error: string) {
    this.logger.debug(error);
  }

}
