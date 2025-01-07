import pool from "../config/db";
import jwt, { DecodedToken } from "jsonwebtoken";
import { Request, Response, NextFunction } from 'express';


export async function validateAcessToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    return res.status(401).json({ error: 'Token inválido' });
  }

  jwt.verify(token, process.env.JWT_LONG_SECRET, async (err, decoded) => {
    if(err){
      return res.status(403).json({ error: 'Token inválido'})
    }

    const { userId } = decoded as DecodedToken;

    if(!userId){
      return res.status(401).json({ error: 'Token inválido'})
    }

    const SQLQuery = `SELECT * FROM sessions WHERE acess_token_expires_at > CURRENT_DATE AND user_id = ${userId} AND acess_token = ${acessToken} AND revoked = 'false'`;
    const [rows] = await pool.query(SQLQuery as ISessions[]);
  
    if (!rows || rows.length === 0) {
      return res.status(401).json({ error: "Token inválido!" });
    }
    
    req.body.userId = userId;
    return next()
  })

}
