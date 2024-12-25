import dotenv from "dotenv";
import logger from "./utils/logger/logger";
import "./jobs/generate-bills-from-recurrences/generate-bills-from-recurrences";

const REQUIRED_ENVS = ["DB_URL", "NODE_ENV"];

// Loads environment variables from .env file
dotenv.config();

// Validates if all required environment variables are set
function validateEnvironmentVariables() {
  const missingEnv = REQUIRED_ENVS.filter((envVar) => !process.env[envVar]);

  if (missingEnv.length > 0) {
    // Throws an error if there are missing environment variables
    logger.error(
      `The following environment variables are missing: ${missingEnv.join(", ")}`
    );

    throw new Error(
      "Some required environment variables are missing. Please check the logs."
    );
  }
}

// Validates environment variables and starts the application if everything is ok
async function bootstrap() {
  try {
    validateEnvironmentVariables();

    logger.info(
      `Starting application in ${process.env.NODE_ENV} environment...`
    );
  } catch (error) {
    logger.error(`Error starting application: ${error}`);
    setTimeout(() => {
      process.exit(1);
    }, 200);
  }
}

// Handles uncaught exceptions and rejections (Não entendi muito bem a diferença entre um exception e um rejection)
process.on("uncaughtException", (error) => {
  logger.error("Uncaught exception with error:", error);

  setTimeout(() => {
    process.exit(1);
  }, 200);
});

process.on("unhandledRejection", (reason) => {
  logger.error("Rejected promises with reason:", reason);
  setTimeout(() => {
    process.exit(1);
  }, 200);
});

bootstrap();
