import { Request, Response, NextFunction } from 'express';
import { Token } from "../models/Token";


export async function validateAcessToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }
  
  const [bearer, acessToken] = authHeader.split(' ');
  
  if (bearer !== 'Bearer' || !acessToken) {
    return res.status(401).json({ error: 'Token inválido' });
  }
  
  const session = new Token(0);
  const userId = await session.validateAcessToken(acessToken)

  if(!userId) {
    res.status(401).json({ error: "Credenciais inválidas"})
    return
  }

  res.locals.userId = userId;

  next()
}
