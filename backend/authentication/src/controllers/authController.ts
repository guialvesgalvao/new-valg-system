import { Request, Response } from "express";
import { Token } from "../models/Token";
import { TokenType } from "../shared/enums/TokenType";
import { UserRepository } from "../repositories/UserRepository";
import { userValidator } from "../validators/userValidator";

async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const user = new UserRepository();

  try {
    if (!email || !password) {
      res.status(400).json({ error: "Necessário informar o email e senha" });
      return;
    }

    const userId = await user.authentication(email, password);

    if (!userId) {
      res.status(401).json({ message: "Credenciais inválidas" });
      return;
    }

    const token = new Token(userId);

    const { acessToken, refreshToken } = token.create(TokenType.Default);

    res.status(200).json({ acessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar autenticar o usuário" });
  }
}

async function createUser(req: Request, res: Response) {
  const { name, email, password, celNumber } = req.body;
  const user = new UserRepository();

  try {
    const validationParams = userValidator({
      name,
      email,
      password,
      celNumber,
    });

    if (validationParams) {
      res.status(400).json({ error: validationParams.error });
    }

    await user.create({ name, email, password, celNumber})

    res.status(200).json({ message: "Conta criada com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao processar a conta informada" });
  }
}

export { loginUser, createUser };
