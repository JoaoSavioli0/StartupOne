import { CookieOptions, Request, Response } from "express";
import { Usuario } from "../models";
import bcrypt from "bcryptjs";

export async function register(req: Request, res: Response) {
  const { email, name, phone, cpf, birthDate, password, idCondominio } =
    req.body;
  console.log("body: ", req.body);
  try {
    const hashedSenha = await bcrypt.hash(password, 10);

    const novoUsuario = Usuario.build({
      nome: name,
      email: email,
      cpf: cpf,
      dataNascimento: birthDate,
      telefone: phone,
      senhaHash: hashedSenha,
      idCondominio: idCondominio,
      idEndereco: 1,
      tipo: "resident",
      dataCriacao: new Date(),
      dataAlteracao: new Date(),
    });

    await novoUsuario.save();

    return res.status(201).json({ message: "Usuário registrado" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno" });
  }
}
