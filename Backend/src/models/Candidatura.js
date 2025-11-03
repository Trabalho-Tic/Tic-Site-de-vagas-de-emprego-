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
  Candidatura.belongsTo(models.vaga, {
    foreignKey: "id_vaga",
    as: "vaga",
  });

  Candidatura.belongsTo(models.Candidato, {
    foreignKey: "id_candidato",
    as: "candidato",
  });
};

module.exports = Candidatura;
