const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Company = sequelize.define("Company", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  logo: {
    type: DataTypes.STRING,
    allowNull: true,
    get() {
      const rawValue = this.getDataValue("logo");
      return rawValue
        ? `${process.env.BASE_URL || "http://localhost:8000"}/uploads/logos/${rawValue}`
        : null;
    },
  },
  url_site: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pais: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cidade: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  sobre: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: "tb_company",
  timestamps: true,
});

Company.belongsTo(User, { foreignKey: "id_user", as: "user", onDelete: "CASCADE" });
User.hasOne(Company, { foreignKey: "id_user", as: "company", onDelete: "CASCADE" });

module.exports = Company;
