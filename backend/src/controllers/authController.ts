import { Request, Response } from "express";
import { Usuario } from "../models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { mapUsuarioDTO } from "../dtos/UsuarioDTO";

dotenv.config();

const SECRET =
  process.env.JWT_SECRET ||
  "SL0X3257HT32HGL35VN35NG3BVNMDSKLG325IUTIRHSGJSIHQ204U214CTJRSHSAVN";

export async function login(req: Request, res: Response) {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario)
      return res.status(401).json({ message: "Usuário não encontrado" });

    const senhaValida = bcrypt.compare(senha, usuario.senhaHash);

    if (!senhaValida)
      return res.status(401).json({ message: "Senha incorreta" });

    const usuarioDto = mapUsuarioDTO(usuario, "resident"); //resident é a role usada para limitar os dados do DTO

    const token = jwt.sign(
      { idUsuario: usuario.id, idCondominio: usuario.idCondominio },
      SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.json({
      message: "Login feito com sucesso",
      token,
      usuario: usuarioDto,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro interno" });
  }
}

export async function register(req: Request, res: Response) {
  const { email, nome, cpf, dataNascimento, telefone, senha, idCondominio } =
    req.body;

  try {
    const hashedSenha = await bcrypt.hash(senha, 10);

    const novoUsuario = Usuario.build({
      nome: nome,
      email: email,
      cpf: cpf,
      dataNascimento: dataNascimento,
      telefone: telefone,
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
