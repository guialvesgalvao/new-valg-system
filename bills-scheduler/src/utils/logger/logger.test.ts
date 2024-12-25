import { Logger as LoggerType } from "winston";
import Logger from "./logger";
import fs from "fs";

let logger: LoggerType;

beforeEach(() => {
  logger = Logger;

  if (fs.existsSync("logs/error.log")) {
    fs.unlinkSync("logs/error.log");
  }

  if (fs.existsSync("logs/combined.log")) {
    fs.unlinkSync("logs/combined.log");
  }
});

describe("Logger", () => {
  it("should create a logger", () => {
    expect(logger).toBeDefined();
  });

  it("should log info", () => {
    logger.info("Info log");
  });

  it("should log error", () => {
    logger.error("Error log");
  });

  it("should create file logs", () => {
    logger.info("Info log");
    logger.error("Error log");

    const errorLogExists = fs.existsSync("/logs/error.log");
    const combinedLogExists = fs.existsSync("/logs/combined.log");

    expect(errorLogExists).toBeTruthy();
    expect(combinedLogExists).toBeTruthy();
  });
});
