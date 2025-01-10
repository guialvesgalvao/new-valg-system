import { billsFactory } from "../factories/billsFactory";
import { BillRepository } from "../repositories/billRepository";
import { IBill } from "../shared/interfaces/IBill";
import { getObjectMetadata } from "./getObjectMetadata";

export class BillService {
  private readonly _repository: BillRepository;
  userId: number;

  constructor(userId: number) {
    this._repository = new BillRepository(userId);

    this.userId = userId;
  }

  async get(onlyOverdue: boolean): Promise<IBill[]> {
    const billsFromRepo = await this._repository.get(onlyOverdue);
    const bills = billsFactory(billsFromRepo);

    return bills;
  }

  async updateBillMetadata(data: { [key: string]: string; }, billId: number): Promise<boolean> {
    const billRepository = new BillRepository(this.userId);
    const fieldMap = {
      name: "name",
      amount: "amount",
      due_date: "due_date",
      status: "status",
      isRecurring: "is_generated_by_recurrence"
    };

    try {

      const { fieldsToUpdate, metadataValues } = getObjectMetadata(data ,fieldMap);

      const updateBill = await billRepository.updateMetadata(billId, fieldsToUpdate, metadataValues);

      return updateBill
    } catch (error) {
      return false;
    }
  }
}
