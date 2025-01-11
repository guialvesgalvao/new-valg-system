import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import { IRecurringBill, IRecurringBillDBSchema } from "../shared/interfaces/IRecurringBill";

export class RecurringBillRepository {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;
  }

  async get() {
    const SQLQuery = "SELECT * FROM bill_recurrences WHERE user_id = ?";

    const [rows] = await pool.query(SQLQuery, [this.userId]);

    return rows as IRecurringBillDBSchema[];
  }

  async checkRecurringBillExist(billId: number): Promise<boolean> {
    const SQLQuery = "SELECT * FROM bill_recurrences WHERE user_id = ? AND id = ?";

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [this.userId, billId]);

    return rows.length > 0;
  }

  async create(data: IRecurringBill): Promise<boolean> {
    const SQLQuery = `
        INSERT INTO bill_recurrences (name, average_amount, day_of_due, end_date, user_id, enabled)
        VALUES (?, ?, ?, ?, ?, ?)
      `;

    const [result] = await pool.query<ResultSetHeader>(SQLQuery, [
      data.name,
      data.averageAmount,
      data.dayOfDue,
      data.endDate,
      this.userId,
      data.enabled
    ]);

    return result.affectedRows > 0;
  }

  async updateMetadata(
    billId: number,
    fieldsToUpdate: string[],
    metadataValues: (string | number)[]
  ): Promise<boolean> {
    try {
      const SQLUpdateQuery = `UPDATE bill_recurrences SET ${fieldsToUpdate.join(", ")} WHERE id = ? AND user_id = ?`;

      const [result] = await pool.query<ResultSetHeader>(SQLUpdateQuery, [...metadataValues, billId, this.userId]);

      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }
  
  async delete(recurringBillId: number): Promise<boolean> {
    try {
      const SQLQuery = `DELETE FROM bill_recurrences WHERE id = ? AND user_id = ?`;

      const [result] = await pool.query<ResultSetHeader>(SQLQuery, [recurringBillId, this.userId]);

      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }
}
