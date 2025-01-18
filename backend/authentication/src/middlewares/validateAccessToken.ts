import { Request, Response, NextFunction } from 'express';
import { Token } from "../models/Token";


export async function validateAccessToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Token não encontrado' });
    return 
  }
  
  const [bearer, accessToken] = authHeader.split(' ');
  
  if (bearer !== 'Bearer' || !accessToken) {
    res.status(401).json({ error: 'Token inválido' });
    return 
  }
  
  const session = new Token(0);
  const userId = await session.validateAccessToken(accessToken)

  if(!userId) {
    res.status(401).json({ error: "Credenciais inválidas"})
    return
  }

  res.locals.userId = userId;

  next()
}
