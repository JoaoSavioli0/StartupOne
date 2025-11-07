import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { Condominio } from "./Condominio";
import { Endereco } from "./Endereco";
import { sequelize } from "../config/db";

export interface UsuarioAttributes {
  id: number;
  idResponsavel?: number | null;
  nome: string;
  email: string;
  dataNascimento: Date;
  telefone: string;
  cpf: string;
  senhaHash: string;
  tipo: string;
  imagemPerfil?: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  idCondominio: number;
  idEndereco: number;
}

export interface UsuarioCreationAttributes
  extends Optional<
    UsuarioAttributes,
    "id" | "idResponsavel" | "imagemPerfil"
  > {}

export class Usuario
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>
  implements UsuarioAttributes
{
  declare id: number;
  declare idResponsavel: number | null;
  declare nome: string;
  declare email: string;
  declare dataNascimento: Date;
  declare telefone: string;
  declare cpf: string;
  declare senhaHash: string;
  declare tipo: string;
  declare imagemPerfil?: string;
  declare dataCriacao: Date;
  declare dataAlteracao: Date;
  declare idCondominio: number;
  declare idEndereco: number;

  // associações
  declare responsavel?: Usuario;
  declare condominio?: Condominio;
  declare endereco: Endereco;

  // mixins do Sequelize (helpers prontos)
  declare getResponsavel: BelongsToGetAssociationMixin<Usuario>;
  declare setResponsavel: BelongsToSetAssociationMixin<Usuario, number>;
  declare getCondominio: BelongsToGetAssociationMixin<Condominio>;
  declare setCondominio: BelongsToSetAssociationMixin<Condominio, number>;
  declare getEndereco: BelongsToGetAssociationMixin<Endereco>;
  declare setEndereco: BelongsToSetAssociationMixin<Endereco, number>;
}

Usuario.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    dataNascimento: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "data_nascimento",
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    senhaHash: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "senha_hash",
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imagemPerfil: {
      type: DataTypes.STRING,
      field: "imagem_perfil",
    },
    dataCriacao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "data_criacao",
    },
    dataAlteracao: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: "data_alteracao",
    },
    idResponsavel: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: "id_responsavel",
    },
    idCondominio: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "id_condominio",
    },
    idEndereco: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "id_endereco",
    },
  },
  {
    sequelize,
    tableName: "usuarios",
    timestamps: false,
  }
);
