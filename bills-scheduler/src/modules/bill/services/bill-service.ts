import { Bill } from "@prisma/client";
import { BillRepository } from "../repositories/bill-repository";
import { CreateBill, CreateBillType } from "../validations/bill-validations";

export class BillService {
  constructor(private readonly billRepository: BillRepository) {}

  async getAllBills(): Promise<Bill[]> {
    return this.billRepository.getAllBills();
  }

  async getPendingBills(): Promise<Bill[]> {
    return this.billRepository.getPendingBills();
  }

  async getOverdueBills(): Promise<Bill[]> {
    return this.billRepository.getOverdueBills();
  }

  async createBill(data: CreateBillType): Promise<Bill> {
    const bill = CreateBill.parse(data);
    return this.billRepository.createBill(bill);
  }
}
