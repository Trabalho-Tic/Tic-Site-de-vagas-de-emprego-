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
    allowNull: true,
  },
  resumoProf: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  experiencias: {
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
  },
  habilidades: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
  tableName: "tb_candidatocurriculo",
  timestamps: true,
});

CandidatoCurriculo.belongsTo(User, { foreignKey: "id_user", as: "user", onDelete: "CASCADE" });
User.hasOne(CandidatoCurriculo, { foreignKey: "id_user", as: "curriculos", onDelete: "CASCADE" });


module.exports = CandidatoCurriculo;
