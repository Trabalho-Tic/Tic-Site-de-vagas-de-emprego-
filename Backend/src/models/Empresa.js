const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Empresa = sequelize.define("Empresa", {
  id_user: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  razaoSocial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "tb_empresa",
  timestamps: true,
});

Empresa.belongsTo(User, { foreignKey: "id_user", as: "user" });
User.hasOne(Empresa, { foreignKey: "id_user", as: "empresa" });

module.exports = Empresa;
