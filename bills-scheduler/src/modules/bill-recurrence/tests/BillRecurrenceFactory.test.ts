import { BillRecurrenceService } from "../services/BillRecurrenceService";
import { billRecurrenceService } from "../factories/BillRecurrenceFactory";

describe("BillRecurrenceFactory", () => {
  it("should create an instance of BillRecurrenceService", () => {
    expect(billRecurrenceService).toBeInstanceOf(BillRecurrenceService);
  });
});
