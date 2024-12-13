import { Bill } from "../factories/bills-factory";
import { BillsRequest } from "../interface/IBill";
import { BillsRepo } from "../repositories/bills-repo";

export class BillsService {
  private readonly _repository: BillsRepo;

  constructor() {
    this._repository = new BillsRepo();

    this.getBills = this.getBills.bind(this);
    this.createBill = this.createBill.bind(this);
    this.updateBill = this.updateBill.bind(this);
    this.deleteBill = this.deleteBill.bind(this);
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

  async createBill(bill: BillsRequest) {
    try {
      const newBill = await this._repository.createBill(bill);
      
      return new Bill(newBill);
    } catch (error) {
      throw new Error("Error to create bill");
    }
  }

  async updateBill(bill: BillsRequest) {
    try {
      const updateBill = await this._repository.updateBill(bill);
      
      return new Bill(updateBill);
    } catch (error) {
      throw new Error("Error to update bill");
    }
  }

  async deleteBill(billId: number) {
    try {
      const billToDelete = await this._repository.deleteBill(billId);
      
      return billToDelete;
    } catch (error) {
      throw new Error("Error to delete bill");
    }
  }
}
