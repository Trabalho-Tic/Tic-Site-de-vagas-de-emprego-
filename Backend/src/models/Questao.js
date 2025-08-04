const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Questao = sequelize.define("Questao", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true        
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipoQuestao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_dominio: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_dominio",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
}, {
    tableName: "tb_questao",
    timestamps: true,
    createdAt: false
})

module.exports = Questao