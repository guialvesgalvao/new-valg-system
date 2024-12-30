import { billService } from "../factories/bill-factory";
import { BillService } from "../services/bill-service";

describe("BillFactory", () => {
  it("should create an instance of BillService", () => {
    expect(billService).toBeInstanceOf(BillService);
  });
});
