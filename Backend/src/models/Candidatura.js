const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Candidatura = sequelize.define("Candidatura", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
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
  id_candidato: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tb_candidato",
      key: "id_user",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "enviado",
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "tb_candidatura",
  timestamps: false,
});

Candidatura.associate = (models) => {
  if (models.Vaga) {
    Candidatura.belongsTo(models.Vaga, {
      foreignKey: "id_vaga",
      as: "vaga",
    });
  } else {
    console.warn("⚠️ models.Vaga não carregado ao associar Candidatura");
  }

  if (models.Candidato) {
    Candidatura.belongsTo(models.Candidato, {
      foreignKey: "id_candidato",
      as: "candidato",
    });
  } else {
    console.warn("⚠️ models.Candidato não carregado ao associar Candidatura");
  }
};

module.exports = Candidatura;
