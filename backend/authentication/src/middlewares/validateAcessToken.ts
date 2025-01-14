import { Request, Response, NextFunction } from 'express';
import { Token } from "../models/Token";


export async function validateAcessToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token não encontrado' });
    return 
  }
  
  const [bearer, acessToken] = authHeader.split(' ');
  
  if (bearer !== 'Bearer' || !acessToken) {
    res.status(401).json({ error: 'Token inválido' });
    return 
  }
  console.log('Token Recebido', acessToken)
  const session = new Token(0);
  const userId = await session.validateAcessToken(acessToken)

  if(!userId) {
    res.status(401).json({ error: "Credenciais inválidas"})
    return
  }

  res.locals.userId = userId;

  next()
}
