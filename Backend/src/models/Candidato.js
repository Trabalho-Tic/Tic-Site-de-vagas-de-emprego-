const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Candidato = sequelize.define("Candidato", {
  id_user: {
    type: DataTypes.UUID,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },

  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  // -------- NOVOS CAMPOS --------
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  estado: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  dataNascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },

  genero: {
    type: DataTypes.ENUM("masculino", "feminino", "outro", "prefiro_nao_dizer"),
    allowNull: true,
  },

  linkedin: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  github: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  portfolio: {
    type: DataTypes.STRING,
    allowNull: true,
  },

  sobre: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  foto: {
    type: DataTypes.STRING, // nome do arquivo salvo pelo multer
    allowNull: true,
  },

}, {
  tableName: "tb_candidato",
  timestamps: true,
});

// 🔗 Relação com usuário
Candidato.belongsTo(User, { foreignKey: "id_user", as: "user", onDelete: "CASCADE" });
User.hasOne(Candidato, { foreignKey: "id_user", as: "candidato", onDelete: "CASCADE" });

// 🔗 Relação com candidaturas
Candidato.associate = (models) => {
  Candidato.hasMany(models.Candidatura, {
    foreignKey: "id_candidato",
    as: "candidaturas",
  });
};

Candidato.belongsToMany(models.SubtipoDeficiencia, {
    through: "tb_candidato_subtipodeficiencia",
    foreignKey: "id_candidato",
    otherKey: "id_subtipodeficiencia",
    as: "subtipos"
  });

module.exports = Candidato;
