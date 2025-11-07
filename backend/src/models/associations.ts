import { Condominio } from "./Condominio";
import { Endereco } from "./Endereco";
import { Usuario } from "./Usuario";

Usuario.belongsTo(Condominio, {
  foreignKey: "idCondominio",
  as: "condominio",
});

Usuario.belongsTo(Endereco, {
  foreignKey: "idEndereco",
  as: "endereco",
});

Usuario.belongsTo(Usuario, {
  foreignKey: "idResponsavel",
  as: "responsavel",
});

Condominio.belongsTo(Endereco, {
  foreignKey: "idEndereco",
  as: "endereco",
});
