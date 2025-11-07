import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const SECRET =
  process.env.JWT_SECRET ||
  "SL0X3257HT32HGL35VN35NG3BVNMDSKLG325IUTIRHSGJSIHQ204U214CTJRSHSAVN";

export function autenticar(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res
      .status(401)
      .json({ error: "Token de autenticação não encontrado" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET) as {
      idUsuario: number;
      idCondominio: number;
    };
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido ou expirado" });
  }
}
