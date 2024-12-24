import { PrismaClient } from "@prisma/client";
import { BillRecurrenceRepository } from "../repositories/BillRecurrenceRepository";
import { BillRecurrenceService } from "../services/BillRecurrenceService";

const prisma = new PrismaClient();

const billRecurrenceRepository = new BillRecurrenceRepository(prisma);
const billRecurrenceService = new BillRecurrenceService(
  billRecurrenceRepository
);

export { billRecurrenceService };
