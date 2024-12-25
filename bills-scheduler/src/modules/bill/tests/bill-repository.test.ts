import { mockDeep, DeepMockProxy } from "jest-mock-extended";

import { BillRepository } from "../repositories/bill-repository";
import { PrismaClient } from "@prisma/client";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mockDeep<PrismaClient>()),
}));

let billRepository: BillRepository;
let prismaMock: DeepMockProxy<PrismaClient>;

beforeEach(() => {
  prismaMock = new PrismaClient() as unknown as DeepMockProxy<PrismaClient>;
  billRepository = new BillRepository(prismaMock);
});

describe("Validate BillRepository", () => {
  it("should call prisma.bill.findMany when getAllBills is called", async () => {
    await billRepository.getAllBills();
    expect(prismaMock.bill.findMany).toHaveBeenCalled();
  });

  it("should call prisma.bill.findMany with status Pending when getPendingBills is called", async () => {
    await billRepository.getPendingBills();
    expect(prismaMock.bill.findMany).toHaveBeenCalledWith({
      where: {
        status: "Pending",
      },
    });
  });

  it("should call prisma.bill.findMany with status Overdue when getOverdueBills is called", async () => {
    await billRepository.getOverdueBills();
    expect(prismaMock.bill.findMany).toHaveBeenCalledWith({
      where: {
        status: "Overdue",
      },
    });
  });
});
