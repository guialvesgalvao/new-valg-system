import { Bill } from "@prisma/client";
import { BillRepository } from "../repositories/BillRepository";

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
}
