const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const VagaDescricao = sequelize.define("vagaDescricao", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.JSON,
        allowNull: false
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
    tableName: "tb_vagaDescricao",
}
)

module.exports = VagaDescricao