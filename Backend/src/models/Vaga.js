const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Vaga = sequelize.define("Vaga", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  modelo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id_company: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "tb_company",
      key: "id",
    },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
}, {
  tableName: "tb_vaga",
  timestamps: true,
});

// ✅ Todas as associações centralizadas
Vaga.associate = (models) => {
  Vaga.hasOne(models.VagaDescricao, {
    foreignKey: "id_vaga",
    as: "descricao",
  });

  Vaga.hasOne(models.VagaBeneficio, {
    foreignKey: "id_vaga",
    as: "beneficio",
  });

  Vaga.hasOne(models.VagaProcesso, {
    foreignKey: "id_vaga",
    as: "processo",
  });

  Vaga.hasOne(models.VagaRequisicao, {
    foreignKey: "id_vaga",
    as: "requisicao",
  });

  Vaga.belongsTo(models.Company, {
    foreignKey: "id_company",
    as: "empresa",
  });

  // 🔗 Relacionamento com candidaturas
  if (models.Candidatura) {
    Vaga.hasMany(models.Candidatura, {
      foreignKey: "id_vaga",
      as: "candidaturas",
    });
  } else {
    console.warn("⚠️ Model Candidatura ainda não carregado ao associar Vaga");
  }
};

module.exports = Vaga;
