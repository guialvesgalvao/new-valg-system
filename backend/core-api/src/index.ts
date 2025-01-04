import express from "express";
import { billsRouter } from "./routes/billRoutes";
import { recurringBillsRouter } from "./routes/recurringBillsRoutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/bills", billsRouter);
app.use("/recurring-bills", recurringBillsRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
