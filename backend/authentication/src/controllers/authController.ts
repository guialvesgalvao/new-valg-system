import { Request, Response } from "express";
import pool from "../config/db";


async function loginUser(req: Request, res: Response): Promise<void> {
  try {
   
    res.status(200).json({ message: "Usuário logado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}

async function registerUser(req: Request, res: Response) {

  try {
    
    res.status(201).json({ message: "Conta criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a conta informada" });
  }
}

export { loginUser, registerUser };
