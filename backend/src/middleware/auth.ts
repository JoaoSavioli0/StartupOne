import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ error: "Token de autenticação não encontrado!" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido!" });
  }
}
