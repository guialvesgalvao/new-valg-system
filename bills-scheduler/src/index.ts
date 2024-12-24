import { billService } from "./modules/bill/factories/BillFactory";
import dotenv from "dotenv";

dotenv.config();

async function getAccount() {
  const bills = await billService.getAllBills();
  console.log(bills);
}

getAccount();
