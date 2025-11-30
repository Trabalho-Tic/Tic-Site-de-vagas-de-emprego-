const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SubTipoDeficienciaTipoDeficiencias = sequelize.define(
  "SubTipoDeficienciaTipoDeficiencias",
  {
    id_tipodeficiencia: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    id_subtipodeficiencia: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    tableName: "tb_subtipodeficienciatipodeficiencias",
    timestamps: true
  }
);

module.exports = SubTipoDeficienciaTipoDeficiencias;
