import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import { IBill, IBillDBSchema } from "../shared/interfaces/IBill";

export class BillRepository {
  userId: number;

  constructor(userId: number) {
    this.userId = userId;

    this.get = this.get.bind(this);
    this.checkBillExist = this.checkBillExist.bind(this);
    this.create = this.create.bind(this);
    this.updateMetadata = this.updateMetadata.bind(this);
    this.delete = this.delete.bind(this);
  }

  async get(onlyOverdue: boolean): Promise<IBillDBSchema[]> {
      let SQLQuery = "SELECT * FROM bills WHERE user_id = ?"

      if(onlyOverdue) SQLQuery += " AND due_date < CURRENT_DATE";

      const [rows] = await pool.query(SQLQuery, [this.userId]);

      return rows as IBillDBSchema[];
  }

  async checkBillExist(billId: number): Promise<boolean> {
    const SQLQuery = "SELECT * FROM bills WHERE user_id = ? AND id = ?";

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [this.userId, billId]);

    return rows.length > 0;
  }

  async create({ name, amount, dueDate, status, isRecurring }: IBill): Promise<boolean> {
    const SQLQuery = `
    INSERT INTO bills (name, amount, due_date, status, is_generated_by_recurrence, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

    try {
      const [result] = await pool.query<ResultSetHeader>(SQLQuery, [
        name,
        amount,
        dueDate,
        status ?? "",
        isRecurring ? 1 : 0,
        this.userId
      ]);

      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }

  async updateMetadata(
    billId: number,
    fieldsToUpdate: string[],
    metadataValues: (string | number)[]
  ): Promise<boolean> {
    try {
      const SQLUpdateQuery = `UPDATE bills SET ${fieldsToUpdate.join(", ")} WHERE id = ? AND user_id = ?`;

      const [result] = await pool.query<ResultSetHeader>(SQLUpdateQuery, [...metadataValues, billId, this.userId]);

      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }

  async delete(billId: number): Promise<boolean> {
    try {
      const SQLQuery = `DELETE FROM bills WHERE id = ? AND user_id = ?`;

      const [result] = await pool.query<ResultSetHeader>(SQLQuery, [billId, this.userId]);

      return result.affectedRows > 0;
    } catch (error) {
      return false;
    }
  }
}
