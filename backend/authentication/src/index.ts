import express from "express";
import { authRouter } from './routes/authRouter';
import { tokenRouter } from "./routes/tokenRouter";
import { enviromentVariableValidator } from "./validators/enviromentVariablesValidator"
import cors from 'cors';

const app = express();
const PORT = 3000;

const { JWT_LONG_SECRET, OTP_SECRET } = enviromentVariableValidator()

app.use(cors({
  origin: '*'
}))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir qualquer origem
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use(express.json());
app.use('/auth', authRouter)
app.use('/token', tokenRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export { JWT_LONG_SECRET, OTP_SECRET }
