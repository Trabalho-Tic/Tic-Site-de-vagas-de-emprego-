const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Candidatura = sequelize.define("candidatura", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  id_vaga: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tb_vaga", // referência à tabela de vagas
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  id_candidato: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tb_candidato", // referência à tabela de candidatos
      key: "id_user", // porque no seu model Candidato, a PK é o id_user
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "enviado", // status inicial
  },
  data_envio: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "tb_candidatura",
  timestamps: false,
});


// 🔗 RELACIONAMENTOS
Candidatura.associate = (models) => {
  // Cada candidatura pertence a uma vaga
  Candidatura.belongsTo(models.vaga, {
    foreignKey: "id_vaga",
    as: "vaga",
  });

  // Cada candidatura pertence a um candidato
  Candidatura.belongsTo(models.Candidato, {
    foreignKey: "id_candidato",
    as: "candidato",
  });
};

module.exports = Candidatura;
