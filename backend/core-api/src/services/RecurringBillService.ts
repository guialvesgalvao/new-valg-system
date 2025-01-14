import { recurringBillsFactory } from "../factories/recurringBillFactory";
import { RecurringBillRepository } from "../repositories/RecurringBillRepository";
import { IRecurringBill } from "../shared/interfaces/IRecurringBill";
import { recurringBillValidator } from "../validators/recurringBillValidator";
import { getObjectMetadata } from "./getObjectMetadata";

export class RecurringBillService {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  async get() {
    const repository = new RecurringBillRepository(this.userId);

    const rawItems = await repository.get();

    const recurringBills = recurringBillsFactory(rawItems);

    return recurringBills;
  }

  async create(data: unknown): Promise<string | null> {
    try {
      const validator = recurringBillValidator(data);

      if (validator) return validator;

      const repository = new RecurringBillRepository(this.userId);

      const createItem = await repository.create(data as IRecurringBill);

      if (!createItem) {
        return "Não foi possível realizar a criação das contas";
      }

      return null;
    } catch (error) {
      return "Não foi possível realizar a criação das contas";
    }
  }

  async updateRecurringBillMetadata(data: { [key: string]: string; }, billId: number): Promise<boolean> {
    const repository = new RecurringBillRepository(this.userId);
    const fieldMap = {
        name: "name",
        averageAmount: "average_amount",
        dayOfDue: "day_of_due",
        endDate: "end_date",
        enabled: "enabled"
      };

    try {
      console.log('ola')
      const { fieldsToUpdate, metadataValues } = getObjectMetadata(data ,fieldMap);
      console.log('ola1')
      const updateBill = await repository.updateMetadata(billId, fieldsToUpdate, metadataValues);

      return updateBill
    } catch (error) {
      return false;
    }
  }
}
