import express from "express";
import { authRouter } from "./routes/authRouter";
import { tokenRouter } from "./routes/tokenRouter";
import { enviromentVariableValidator } from "./validators/enviromentVariablesValidator";
import cors from "cors";

import cookieParser from "cookie-parser";

const app = express();
const PORT = 8080;

const { JWT_LONG_SECRET, OTP_SECRET } = enviromentVariableValidator();

// Lista de origens permitidas
const allowedOrigins: string[] = [
  "http://localhost:3000",
  "https://angelic-amazement-production.up.railway.app",
];

app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// Middleware para configurar headers manualmente (se necessário)
app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (!origin) {
    return next();
  }

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(express.json());
app.use("/auth", authRouter);
app.use("/token", tokenRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export { JWT_LONG_SECRET, OTP_SECRET };
