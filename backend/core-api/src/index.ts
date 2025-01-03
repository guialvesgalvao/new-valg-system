import express from "express";
import { billsRouter } from './routes/billRoutes';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/bills', billsRouter)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
