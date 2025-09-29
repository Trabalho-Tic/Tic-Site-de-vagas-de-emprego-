const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VagaProcesso = sequelize.define("VagaProcesso", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    processoSeletivo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    entrevistador: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
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
    tableName: "tb_vagaProcesso",
}
)

module.exports = VagaProcesso