import { createLogger, format, transports } from "winston";

import fs from "fs";
import path from "path";

const LOG_DIR = "logs";

// Creates the log directory if it does not exist
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR);
}

// Creates a log format with timestamp and log level
const logFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.printf(
    ({ timestamp, level, message }) =>
      `[${timestamp}] [${level.toUpperCase()}]: ${message}`
  )
);

// Defines the log level based on the environment
const env = process.env.NODE_ENV ?? "development";
const isDevelopment = env === "development";
const level = isDevelopment ? "debug" : "info";

// Create an instance of the logger
const logger = createLogger({
  level,
  format: logFormat,
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat)
    }),

    new transports.File({
      filename: path.join(LOG_DIR, "error.log"),
      level: "error"
    }),
    new transports.File({ filename: path.join(LOG_DIR, "combined.log") })
  ],
  exceptionHandlers: [
    new transports.File({ filename: path.join(LOG_DIR, "exceptions.log") })
  ],
  rejectionHandlers: [
    new transports.File({ filename: path.join(LOG_DIR, "rejections.log") })
  ]
});

export default logger;
