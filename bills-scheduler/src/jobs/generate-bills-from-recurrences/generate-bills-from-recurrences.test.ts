import logger from "../../utils/logger/logger";

import { generateBillsFromRecurrences } from "../generate-bills-from-recurrences/generate-bills-from-recurrences";
import { billRecurrenceService } from "../../modules/bill-recurrence/factories/bill-recurrence-factory";
import { billService } from "../../modules/bill/factories/bill-factory";

jest.mock("../modules/bill-recurrence/factories/bill-recurrence-factory");
jest.mock("../modules/bill/factories/bill-factory");
jest.mock("../utils/logger/logger");

const mockRecurrences = [
  {
    id: "recurrence1",
    name: "Internet Bill",
    averageAmount: { toNumber: () => 100.5 },
    dayOfDue: 10,
    user: "user1"
  },
  {
    id: "recurrence2",
    name: "Electricity Bill",
    averageAmount: { toNumber: () => 200.75 },
    dayOfDue: 15,
    user: "user2"
  }
];

describe("generateBillsFromRecurrences", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should generate bills for all enabled recurrences", async () => {
    (
      billRecurrenceService.getEnabledAndDueBillRecurrences as jest.Mock
    ).mockResolvedValue(mockRecurrences);

    (billService.createBill as jest.Mock).mockResolvedValueOnce("bill1");
    (billService.createBill as jest.Mock).mockResolvedValueOnce("bill2");

    await generateBillsFromRecurrences();

    expect(
      billRecurrenceService.getEnabledAndDueBillRecurrences
    ).toHaveBeenCalledTimes(1);

    expect(billService.createBill).toHaveBeenCalledTimes(2);

    expect(billService.createBill).toHaveBeenCalledWith({
      name: "Internet Bill",
      amount: 100.5,
      dueDate: expect.any(Date),
      status: "Pending",
      user: "user1",
      isGeneratedByRecurrence: true
    });

    expect(billService.createBill).toHaveBeenCalledWith({
      name: "Electricity Bill",
      amount: 200.75,
      dueDate: expect.any(Date),
      status: "Pending",
      user: "user2",
      isGeneratedByRecurrence: true
    });
  });

  it("should log an error if fetching recurrences fails", async () => {
    (
      billRecurrenceService.getEnabledAndDueBillRecurrences as jest.Mock
    ).mockRejectedValue(new Error("Database connection error"));

    await generateBillsFromRecurrences();

    expect(logger.error).toHaveBeenCalledWith(
      "Error while generating bills from recurrences",
      expect.any(Error)
    );

    expect(billService.createBill).not.toHaveBeenCalled();
  });

  it("should log an error if creating a bill fails", async () => {
    (
      billRecurrenceService.getEnabledAndDueBillRecurrences as jest.Mock
    ).mockResolvedValue(mockRecurrences);

    (billService.createBill as jest.Mock)
      .mockResolvedValueOnce("bill1")
      .mockRejectedValueOnce(new Error("Failed to create bill"));

    await generateBillsFromRecurrences();
  });
});
