import { PrismaClient } from "@prisma/client";
import { BillRecurrenceService } from "../services/BillRecurrenceService";
import { BillRecurrenceRepository } from "../repositories/BillRecurrenceRepository";

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

  describe("getEnabledBillRecurrences", () => {
    it("should return all enabled bill recurrences", async () => {
      const billRecurrences =
        await billRecurrenceService.getEnabledBillRecurrences();

      expect(billRecurrences).toBeInstanceOf(Array);
    });
  });
});
