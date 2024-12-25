import { PrismaClient } from "@prisma/client";
import { BillRepository } from "../repositories/bill-repository";
import { BillService } from "../services/bill-service";

const prisma = new PrismaClient();

const billRepository = new BillRepository(prisma);
const billService = new BillService(billRepository);

export { billService };
