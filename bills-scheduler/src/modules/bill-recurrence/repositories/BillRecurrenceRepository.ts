import { PrismaClient } from "@prisma/client";

export class BillRecurrenceRepository {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async getAllBillRecurrences() {
    return this._prisma.billRecurrence.findMany();
  }

  async getEnabledBillRecurrences() {
    return this._prisma.billRecurrence.findMany({
      where: {
        enabled: true,
      },
    });
  }
}
