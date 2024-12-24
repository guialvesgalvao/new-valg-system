import { billService } from "../factories/BillFactory";
import { BillService } from "../services/BillService";

describe("BillFactory", () => {
  it("should create an instance of BillService", () => {
    expect(billService).toBeInstanceOf(BillService);
  });
});
