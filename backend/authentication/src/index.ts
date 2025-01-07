import express from "express";
import { authRouter } from './routes/authRouter';
import { tokenRouter } from "./routes/tokenRouter";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRouter)
app.use('/token', tokenRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
