const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VagaBeneficio = sequelize.define("vagaBeneficio", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    salario: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    beneficios: {
        type: DataTypes.JSON,
        allowNull: true
    },
    id_vaga: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_vaga",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
}, {
    tableName: "tb_vagaBeneficio",
})

module.exports = VagaBeneficio