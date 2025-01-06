import express from "express";
import { authRouter } from './routes/authRouter';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
