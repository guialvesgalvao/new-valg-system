import { RowDataPacket } from "mysql2";
import pool from "../config/db";
import bcrypt from "bcrypt";

interface CreatUser { 
  name: string;
  email: string;
  password: string;
  celNumber: string;
}

export class UserRepository {
  async create({ name, email, password, celNumber }: CreatUser) {

    try {
      const SQLQuery = `INSERT INTO users (name, email, password, cel_number, role)
            VALUES (?, ?, ?, ?, ?)`;

      await pool.query(SQLQuery, [name, email, password, celNumber, "user"]);
    } catch (error) {
      throw new Error(
        "Não foi possível realizar a criação do usuário no banco de dados"
      );
    }
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
}
