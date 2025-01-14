import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../config/db";
import bcrypt from "bcrypt";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  celNumber: string;
}

export class UserRepository {
  async create({
    name,
    email,
    password,
    celNumber,
  }: CreateUser): Promise<boolean> {
    const saltRounds = 10;

    const encryptedPassword = await bcrypt.hash(password, saltRounds);

    const SQLQuery =
      "INSERT INTO users (name, email, password, cel_number, role) VALUES (?, ?, ?, ?, ?)";

    const [results] = await pool.query<ResultSetHeader>(SQLQuery, [
      name,
      email,
      encryptedPassword,
      celNumber,
      "user",
    ]);

    if (results.affectedRows) {
      return results.affectedRows > 0;
    }

    return false;
  }

  async authentication(
    email: string,
    password: string
  ): Promise<number | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, password FROM users WHERE email = ?",
      [email]
    );

    if (rows.length === 0) return null;

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) return null;

    return user.id;
  }

  async getByEmail(email: string): Promise<boolean> {
    const SQLQuery = "SELECT * FROM users WHERE email = ?";

    const [rows] = await pool.query<RowDataPacket[]>(SQLQuery, [email]);

    if (rows.length) {
      return rows.length > 0;
    }

    return false;
  }
}
