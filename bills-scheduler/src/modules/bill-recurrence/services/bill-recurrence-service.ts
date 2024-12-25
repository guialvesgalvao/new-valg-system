import { BillRecurrence } from "@prisma/client";
import { BillRecurrenceRepository } from "../repositories/bill-recurrence-repository";

export class BillRecurrenceService {
  constructor(
    private readonly billRecurrenceRepository: BillRecurrenceRepository
  ) {}

  async getAllBillRecurrences(): Promise<BillRecurrence[]> {
    return this.billRecurrenceRepository.getAllBillRecurrences();
  }

  async getAllEnabledBillRecurrences(): Promise<BillRecurrence[]> {
    return this.billRecurrenceRepository.getAllEnabledBillRecurrences();
  }

  async getEnabledAndDueBillRecurrences(): Promise<BillRecurrence[]> {
    const today = new Date();
    return this.billRecurrenceRepository.getEnabledAndDueBillRecurrences(today);
  }
}
