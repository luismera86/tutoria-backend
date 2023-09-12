import winston from "winston";

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      format: winston.format.simple(),
    }),
    new winston.transports.File({
      filename: "logs/warning.log",
      level: "warn",
      format: winston.format.simple(),
    }),
  ],
});

export { logger };
