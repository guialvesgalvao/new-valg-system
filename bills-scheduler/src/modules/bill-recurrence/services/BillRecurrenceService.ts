import { BillRecurrenceRepository } from "../repositories/BillRecurrenceRepository";

export class BillRecurrenceService {
  constructor(
    private readonly billRecurrenceRepository: BillRecurrenceRepository
  ) {}

  async getAllBillRecurrences() {
    return this.billRecurrenceRepository.getAllBillRecurrences();
  }

  async getEnabledBillRecurrences() {
    return this.billRecurrenceRepository.getEnabledBillRecurrences();
  }
}
