import { PrismaClient } from "@prisma/client";
import { BillRecurrenceService } from "../services/bill-recurrence-service";
import { BillRecurrenceRepository } from "../repositories/bill-recurrence-repository";

describe("BillRecurrenceService", () => {
  let billRecurrenceService: BillRecurrenceService;

  beforeAll(() => {
    const prisma = new PrismaClient();

    billRecurrenceService = new BillRecurrenceService(
      new BillRecurrenceRepository(prisma)
    );
  });

  describe("getAllBillRecurrences", () => {
    it("should return all bill recurrences", async () => {
      const billRecurrences =
        await billRecurrenceService.getAllBillRecurrences();
      expect(billRecurrences).toBeInstanceOf(Array);
    });
  });

  describe("getAllEnabledBillRecurrences", () => {
    it("should return all enabled bill recurrences", async () => {
      const billRecurrences =
        await billRecurrenceService.getAllEnabledBillRecurrences();
      expect(billRecurrences).toBeInstanceOf(Array);
    });
  });
});
