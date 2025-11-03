const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VagaBeneficio = sequelize.define("VagaBeneficio", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  salario: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  beneficios: {
    type: DataTypes.JSON,
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
  tableName: "tb_vagaBeneficio",
  timestamps: false,
});

VagaBeneficio.associate = (models) => {
  if (models.Vaga) {
    VagaBeneficio.belongsTo(models.Vaga, {
      foreignKey: "id_vaga",
      as: "vaga",
    });
  } else {
    console.warn("⚠️ Model Vaga não carregado ao associar VagaBeneficio");
  }
};

module.exports = VagaBeneficio;
