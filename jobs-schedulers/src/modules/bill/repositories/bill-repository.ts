import { PrismaClient } from "@prisma/client";
import { CreateBillType } from "../validations/bill-validations";

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
        status: "Pending"
      }
    });
  }

  async getOverdueBills() {
    return this._prisma.bill.findMany({
      where: {
        status: "Overdue"
      }
    });
  }

  async createBill(data: CreateBillType) {
    const response = await this._prisma.bill.create({
      data: {
        ...data,
        status: "Pending"
      },
      select: {
        id: true
      }
    });

    return response.id;
  }
}
