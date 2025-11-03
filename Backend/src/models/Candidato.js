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
  deficiencias: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  tableName: "tb_candidato",
  timestamps: true,
});

// 🔗 Relação com usuário
Candidato.belongsTo(User, { foreignKey: "id_user", as: "user", onDelete: "CASCADE" });
User.hasOne(Candidato, { foreignKey: "id_user", as: "candidato", onDelete: "CASCADE" });

// 🔗 Relação com candidaturas — dentro da função associate
Candidato.associate = (models) => {
  Candidato.hasMany(models.Candidatura, {
    foreignKey: "id_candidato",
    as: "candidaturas",
  });
};

module.exports = Candidato;
