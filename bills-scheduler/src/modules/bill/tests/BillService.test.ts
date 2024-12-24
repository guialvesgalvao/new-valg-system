import { PrismaClient } from "@prisma/client";
import { BillRepository } from "../repositories/BillRepository";
import { BillService } from "../services/BillService";

describe("BillService", () => {
  let billService: BillService;

  beforeEach(() => {
    const prisma = new PrismaClient();
    billService = new BillService(new BillRepository(prisma));
  });

  it("should create an instance of BillService", () => {
    expect(billService).toBeInstanceOf(BillService);
  });

  it("should return an array of bills", async () => {
    const bills = await billService.getAllBills();
    expect(bills).toBeInstanceOf(Array);
  });

  it("should return an array of pending bills", async () => {
    const pendingBills = await billService.getPendingBills();
    expect(pendingBills).toBeInstanceOf(Array);
  });

  it("should return an array of overdue bills", async () => {
    const overdueBills = await billService.getOverdueBills();
    expect(overdueBills).toBeInstanceOf(Array);
  });
});
