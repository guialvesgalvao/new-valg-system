import { PrismaClient } from "@prisma/client";

export class BillRepository {
  private readonly _prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this._prisma = prisma;
  }

  async getAllBills() {
    return this._prisma.bill.findMany();
  }

  async getPendingBills() {
    return this._prisma.bill.findMany({
      where: {
        status: "Pending",
      },
    });
  }

  async getOverdueBills() {
    return this._prisma.bill.findMany({
      where: {
        status: "Overdue",
      },
    });
  }
}
