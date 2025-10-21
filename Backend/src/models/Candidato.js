const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Candidato = sequelize.define("Candidato", {
  id_user: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  deficiencias: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: "tb_candidato",
  timestamps: true,
});

Candidato.belongsTo(User, { foreignKey: "id_user", as: "user" });
User.hasOne(Candidato, { foreignKey: "id_user", as: "candidato" });

module.exports = Candidato;
