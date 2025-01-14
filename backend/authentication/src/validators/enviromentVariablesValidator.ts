import dotenv from 'dotenv';

dotenv.config()

export function enviromentVariableValidator() {
  const requiredEnvVars = ["JWT_LONG_SECRET", "OTP_SECRET", "DB_HOST", "DB_USER", "DB_PASSWORD", "DB_NAME", "DB_PORT"];
  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    throw new Error(
      `As seguintes variáveis de ambiente estão faltando: ${missingEnvVars.join(", ")}`
    );
  }

  return {
    JWT_LONG_SECRET: process.env.JWT_LONG_SECRET as string,
    OTP_SECRET: process.env.OTP_SECRET as string
  };
}
