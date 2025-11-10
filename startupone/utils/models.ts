export interface Usuario {
  id: number;
  nome: string;
  telefone: string;
  imagemPerfil: string;
  endereco: Endereco;
}

export interface Endereco {
  id: number;
  logradouro: string;
  bairro: string;
}
