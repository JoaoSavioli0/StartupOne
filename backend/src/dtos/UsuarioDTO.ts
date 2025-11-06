import { Endereco } from "../models/Endereco";
import { Usuario } from "../models/Usuario";
import { EnderecoDTO, mapEnderecoDTO } from "./EnderecoDTO";

export interface UsuarioDTO {
  id: number;
  nome: string;
  dataNascimento: Date;
  imagemPerfil: string;
  responsavel?: UsuarioDTO;
  endereco: EnderecoDTO;
  telefone: string;
}

export interface AdminUsuarioDTO extends UsuarioDTO {
  cpf: string;
  tipo: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  email: string;
}

export function mapUsuarioDTO(
  usuario: Usuario,
  role: string
): UsuarioDTO | AdminUsuarioDTO {
  const enderecoDTO = mapEnderecoDTO(usuario.endereco, role);

  let base: UsuarioDTO = {
    id: usuario.id,
    nome: usuario.nome,
    dataNascimento: usuario.dataNascimento,
    imagemPerfil: usuario.imagemPerfil,
    endereco: enderecoDTO,
    telefone: usuario.telefone,
  };

  if (usuario.responsavel) {
    base = {
      ...base,
      responsavel: mapUsuarioDTO(usuario.responsavel, role),
    };
  }

  if (role === "admin") {
    const admin = {
      ...base,
      cpf: usuario.cpf,
      tipo: usuario.tipo,
      dataCriacao: usuario.dataCriacao,
      dataAlteracao: usuario.dataAlteracao,
      email: usuario.email,
    };
    return admin;
  }

  return base;
}
