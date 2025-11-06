import { Request, Response } from "express";

export async function login(req: Request, res: Response) {
  const { email, senha } = req.body;

  try {
  } catch (error) {
    return res.status(500).json({ erro: error });
  }
}
