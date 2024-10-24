import { Bill } from "../factories/bills-factory";
import { BillsRepo } from "../repositories/bills-repo";

export class BillsService {
  private _repository: BillsRepo;

  constructor() {
    this._repository = new BillsRepo();

    this.getBills = this.getBills.bind(this);
  }

  async getBills() {
    try {
      const billsFromRepo = await this._repository.getBills();
      const bills = billsFromRepo.map((bill) => new Bill(bill));

      return bills;
    } catch (error) {
      throw new Error("Error to get bills");
    }
  }
}
