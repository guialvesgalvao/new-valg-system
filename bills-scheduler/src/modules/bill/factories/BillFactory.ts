import { PrismaClient } from "@prisma/client";
import { BillRepository } from "../repositories/BillRepository";
import { BillService } from "../services/BillService";

const prisma = new PrismaClient();

const billRepository = new BillRepository(prisma);
const billService = new BillService(billRepository);

export { billService };
