import { PrismaClient } from "@prisma/client";
import { BillRepository } from "../repositories/bill-repository";
import { BillService } from "../services/bill-service";

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

  it("should create a bill", async () => {
    const bill = await billService.createBill({
      name: "Electricity",
      amount: 100,
      dueDate: new Date(),
      isGeneratedByRecurrence: true,
      status: "Pending",
      user: "trigger",
    });

    expect(bill).toHaveProperty("id");
  });
});
