const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubTipoDeficienciaTipoDeficiencias = sequelize.define(
  "SubTipoDeficienciaTipoDeficiencias",
  {
    id_tipodeficiencia: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true // ← parte da PK composta ✅
    },
    id_subtipodeficiencia: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true // ← parte da PK composta ✅
    }
  },
  {
    tableName: "tb_subtipodeficienciatipodeficiencias",
    timestamps: false // ← DESATIVA pq a tabela não tem ID e não precisa ✅
  }
);

module.exports = SubTipoDeficienciaTipoDeficiencias;
