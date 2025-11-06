import { Endereco } from "../models/Endereco";

export interface EnderecoDTO {
  id: number;
  bairro: string;
  logradouro: string;
}

export interface AdminEnderecoDTO extends EnderecoDTO {
  numero: string;
}

export function mapEnderecoDTO(
  endereco: Endereco,
  role: string
): EnderecoDTO | AdminEnderecoDTO {
  const base: EnderecoDTO = {
    id: endereco.id,
    bairro: endereco.bairro,
    logradouro: endereco.logradouro,
  };

  if (role == "admin") {
    const admin = {
      ...base,
      numero: endereco.numero,
    };
    return admin;
  }

  return base;
}
