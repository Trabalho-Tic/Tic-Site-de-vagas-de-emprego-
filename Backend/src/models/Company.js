const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Company = sequelize.define('company', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    logo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    url_site: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    sobre: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "tb_company",
    timestamps: true
})

Company.associate = (models) => {
    Company.hasMany(models.vaga, {
        foreignKey: "id_company",
        as: "vagas",
    });
}

module.exports = Company