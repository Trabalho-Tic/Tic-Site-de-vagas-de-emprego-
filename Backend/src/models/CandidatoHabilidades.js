const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const CandidatoHabilidades = sequelize.define("CandidatoHabilidades", {
  id_user: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  habilidades: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  idiomas: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: "tb_candidatoHabilidades",
  timestamps: true,
});

module.exports = CandidatoHabilidades;
