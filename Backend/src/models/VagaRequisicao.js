const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/database");

const VagaRequisicao = sequelize.define("vagaRequisicao", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    atuacao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    conhecimentos: {
        type: DataTypes.JSON,
        allowNull: false
    },
    destaque: {
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
    tableName: "tb_vagaRequisicao",
    timestamps: true
}
)

module.exports = VagaRequisicao