import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { sequelize } from "../config/db";

export interface EnderecoAttributes {
  id: number;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  dataCriacao: Date;
}

export interface EnderecoCreationAttributes
  extends Optional<EnderecoAttributes, "id" | "numero" | "complemento"> {}

export class Endereco
  extends Model<EnderecoAttributes, EnderecoCreationAttributes>
  implements EnderecoAttributes
{
  declare id: number;
  declare cep: string;
  declare logradouro: string;
  declare numero: string;
  declare complemento: string;
  declare bairro: string;
  declare cidade: string;
  declare uf: string;
  declare dataCriacao: Date;
}

Endereco.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    logradouro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    complemento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uf: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataCriacao: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "data_criacao",
    },
  },
  {
    sequelize,
    tableName: "enderecos",
    timestamps: false,
  }
);
