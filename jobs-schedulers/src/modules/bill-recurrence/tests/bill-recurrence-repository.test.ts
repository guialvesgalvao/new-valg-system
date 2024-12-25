import { DeepMockProxy, mockDeep } from "jest-mock-extended";

import { PrismaClient } from "@prisma/client";
import { BillRecurrenceRepository } from "../repositories/bill-recurrence-repository";

jest.mock("@prisma/client", () => ({
  PrismaClient: jest.fn(() => mockDeep<PrismaClient>())
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

  it("should call prisma.billRecurrence.findMany when getAllEnabledBillRecurrences is called", async () => {
    await billRecurrenceRepository.getAllEnabledBillRecurrences();
    expect(prismaMock.billRecurrence.findMany).toHaveBeenCalled();
  });

  it("should call prisma.billRecurrence.findMany when getEnabledAndDueBillRecurrences is called", async () => {
    const date = new Date();
    await billRecurrenceRepository.getEnabledAndDueBillRecurrences(date);
    expect(prismaMock.billRecurrence.findMany).toHaveBeenCalled();
  });
});
