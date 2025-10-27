const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const CandidatoCurriculo = sequelize.define("CandidatoCurriculo", {
  id_user: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  curriculo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resumoProf: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  expericencias: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  formacao: {
    type: DataTypes.JSON,
    allowNull: true,
  }, 
  cursos: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  tableName: "tb_candidatocurriculo",
  timestamps: true,
});

module.exports = CandidatoCurriculo;
