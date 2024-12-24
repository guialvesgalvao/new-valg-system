import { DeepMockProxy, mockDeep } from "jest-mock-extended";

import { PrismaClient } from "@prisma/client";
import { BillRecurrenceRepository } from "../repositories/BillRecurrenceRepository";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mockDeep<PrismaClient>()),
}));

let billRecurrenceRepository: BillRecurrenceRepository;
let prismaMock: DeepMockProxy<PrismaClient>;

beforeEach(() => {
  prismaMock = new PrismaClient() as unknown as DeepMockProxy<PrismaClient>;
  billRecurrenceRepository = new BillRecurrenceRepository(prismaMock);
});

describe("Validate BillRecurrenceRepository", () => {
  it("should call prisma.billRecurrence.findMany when getAllBillRecurrences is called", async () => {
    await billRecurrenceRepository.getAllBillRecurrences();
    expect(prismaMock.billRecurrence.findMany).toHaveBeenCalled();
  });

  it("should call prisma.billRecurrence.findMany with enabled true when getEnabledBillRecurrences is called", async () => {
    await billRecurrenceRepository.getEnabledBillRecurrences();
    expect(prismaMock.billRecurrence.findMany).toHaveBeenCalledWith({
      where: {
        enabled: true,
      },
    });
  });
});
