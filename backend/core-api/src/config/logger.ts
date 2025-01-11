import winston from "winston";
import fs from "fs";
import path from "path";

const logDirectory = path.join(__dirname, "logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new winston.transports.File({ filename: path.join(logDirectory, "combined.log"), level: "error" }),
    new winston.transports.File({ filename: path.join(logDirectory, "error.log") })
  ]
});
