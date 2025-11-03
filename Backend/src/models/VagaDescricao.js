const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VagaDescricao = sequelize.define("VagaDescricao", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  descricao: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  id_vaga: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tb_vaga",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
}, {
  tableName: "tb_vagaDescricao",
  timestamps: false,
});

VagaDescricao.associate = (models) => {
  if (models.Vaga) {
    VagaDescricao.belongsTo(models.Vaga, {
      foreignKey: "id_vaga",
      as: "vaga",
    });
  } else {
    console.warn("⚠️ Model Vaga não carregado ao associar VagaDescricao");
  }
};

module.exports = VagaDescricao;
