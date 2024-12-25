import { PrismaClient } from "@prisma/client";
import { BillRecurrenceRepository } from "../repositories/bill-recurrence-repository";
import { BillRecurrenceService } from "../services/bill-recurrence-service";

const prisma = new PrismaClient();

const billRecurrenceRepository = new BillRecurrenceRepository(prisma);
const billRecurrenceService = new BillRecurrenceService(
  billRecurrenceRepository
);

export { billRecurrenceService };
