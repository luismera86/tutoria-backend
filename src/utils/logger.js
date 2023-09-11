import winston from "winston";

const customLevelsOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    debug: 4,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    debug: "white",
  },
};

const logger = winston.createLogger({
  level: customLevelsOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({colors: customLevelsOptions.colors}),
        winston.format.simple()
      ),
    }),
    new winston.transports.Console({
      level: "error",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelsOptions.colors }),
        winston.format.simple()
      ),
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
