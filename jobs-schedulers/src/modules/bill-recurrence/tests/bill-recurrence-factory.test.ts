import { BillRecurrenceService } from "../services/bill-recurrence-service";
import { billRecurrenceService } from "../factories/bill-recurrence-factory";

describe("BillRecurrenceFactory", () => {
  it("should create an instance of BillRecurrenceService", () => {
    expect(billRecurrenceService).toBeInstanceOf(BillRecurrenceService);
  });
});
