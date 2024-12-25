import { BillRecurrenceRepository } from "../repositories/bill-recurrence-repository";

export class BillRecurrenceService {
  constructor(
    private readonly billRecurrenceRepository: BillRecurrenceRepository
  ) {}

  async getAllBillRecurrences() {
    return this.billRecurrenceRepository.getAllBillRecurrences();
  }

  async getAllEnabledBillRecurrences() {
    return this.billRecurrenceRepository.getAllEnabledBillRecurrences();
  }

  async getEnabledAndDueBillRecurrences() {
    const today = new Date();

    return this.billRecurrenceRepository.getEnabledAndDueBillRecurrences(today);
  }
}
