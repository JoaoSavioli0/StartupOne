import {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  DataTypes,
  Model,
  Optional,
} from "sequelize";
import { Endereco } from "./Endereco";
import { sequelize } from "../config/db";

export interface CondominioAttributes {
  id: number;
  nome: string;
  cnpj: string;
  logo?: string;
  dataCriacao: Date;
  dataAlteracao: Date;
  idEndereco: number;
}

export interface CondominioCreationAttributes
  extends Optional<CondominioAttributes, "id" | "logo"> {}

export class Condominio
  extends Model<CondominioAttributes, CondominioCreationAttributes>
  implements CondominioAttributes
{
  declare id: number;
  declare nome: string;
  declare cnpj: string;
  declare logo?: string;
  declare dataCriacao: Date;
  declare dataAlteracao: Date;
  declare idEndereco: number;

  // associações
  declare endereco?: Endereco;

  // mixins do Sequelize (helpers prontos)
  declare getEndereco: BelongsToGetAssociationMixin<Endereco>;
  declare setEndereco: BelongsToSetAssociationMixin<Endereco, number>;
}

Condominio.init(
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
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true,
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
    idEndereco: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "id_endereco",
    },
  },
  {
    sequelize,
    tableName: "condominios",
    timestamps: false,
  }
);
