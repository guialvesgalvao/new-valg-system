import express from "express";
import { billsRouter } from "./routes/billRoutes";
import { recurringBillsRouter } from "./routes/recurringBillsRoutes";
import { enviromentVariableValidator } from "./validators/enviromentVariablesValidator";
import { logger } from "./config/logger";
import cors from 'cors';

const app = express();
const PORT = 3000;
logger.info('Data processed successfully', PORT)
const { JWT_LONG_SECRET } = enviromentVariableValidator()

app.use(cors())
app.use(express.json());
app.use("/bills", billsRouter);
app.use("/recurring-bills", recurringBillsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export { JWT_LONG_SECRET }