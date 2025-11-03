const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VagaProcesso = sequelize.define("VagaProcesso", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  processoSeletivo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  entrevistador: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: "tb_vagaProcesso",
  timestamps: false,
});

VagaProcesso.associate = (models) => {
  if (models.Vaga) {
    VagaProcesso.belongsTo(models.Vaga, {
      foreignKey: "id_vaga",
      as: "vaga",
    });
  } else {
    console.warn("⚠️ Model Vaga não carregado ao associar VagaProcesso");
  }
};

module.exports = VagaProcesso;
