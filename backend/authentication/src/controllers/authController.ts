import { Request, Response } from "express";
import { Token } from "../models/Token";
import { TokenType } from "../shared/enums/TokenType";
import { UserRepository } from "../repositories/UserRepository";
import { userValidator } from "../validators/userValidator";
import { SessionRepository } from "../repositories/SessionRepository";

async function loginUser(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const user = new UserRepository();
  const session = new SessionRepository()

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

    const { acessToken, refreshToken, acessTokenExpiresDate, refreshTokenExpiresDate, OTPCode, OTPExpiresDate } = token.create(TokenType.Default);

    const sucessOnLogin = await session.create({ userId, tokenType: TokenType.Default, acessToken, refreshToken, acessTokenExpiresDate, refreshTokenExpiresDate, OTPCode, OTPExpiresDate })
    
    if(sucessOnLogin){
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      res.status(200).json({ acessToken, refreshToken });
      return
    }

    res.status(500).json({ error: "Erro ao tentar autenticar o usuário" });
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
      return;
    }

    const checkUserExist = await user.getByEmail(email);

    if(checkUserExist){
      res.status(401).json({error: 'Já existe um usuário com o email informado!' })
      return
    }

    const createUser = await user.create({ name, email, password, celNumber})

    if(createUser){
      res.status(200).json({ message: "Usuário criado com  criada com sucesso!" });
      return
    }

    res.status(500).json({ error: "Erro ao criar usuário" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

async function updateAmazonUserId(req: Request, res: Response){
  const { amazonUserId, OTPCode } = req.body;
  const parsedOTPCode = parseInt(OTPCode);

  if(!amazonUserId || !parsedOTPCode){
    res.status(400).json({ error:"É necessário informar o parãmetro 'amazonUserId' e 'OTP Code'"})
    return
  }

  try {
    const session = new SessionRepository()
    const validSession = await session.getByOTP(parsedOTPCode);

    if(!validSession){
      res.status(404).json({ error: 'Não foi possível encontrar a sessão com o código OTP informado'})
      return
    }

    
    const updateAmazonUserId = await session.updateAmazonUserId(validSession.sessionId, amazonUserId)

    if(updateAmazonUserId){
      res.status(200).json({ acessToken: validSession.acessToken })
      return
    }

    res.status(500).json({ error: "Erro ao atualizar 'amazonUserId' do usuário" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar 'amazonUserId' do usuário" });
  }
}

async function getLongLifeTokenByAmazonUserId(req: Request, res: Response){
  const { amazonUserId } = req.query;

  if(!amazonUserId || amazonUserId === '' || typeof amazonUserId !== 'string'){
    res.status(400).json({ error: "É necessário informar o 'amazonUserId' do usuário" })
    return
  }
  
  try {
    const session = new SessionRepository();
    const getLongLifeTokenByAmazonUserId = await session.getLongLifeTokenByAmazonUserId(amazonUserId)

    if(getLongLifeTokenByAmazonUserId){
      res.status(200).json({ acessToken: getLongLifeTokenByAmazonUserId})
      return
    }

    res.status(500).json({ error: "Não foi encontrado nenhuma sessão com o 'amazonUserId' informado" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao tentar encontrar a sessão com o 'amazonUserId' informado" });
  }
}

export { loginUser, createUser, updateAmazonUserId, getLongLifeTokenByAmazonUserId };
