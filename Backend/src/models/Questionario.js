const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Questionario = sequelize.define("Questionario", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true        
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    id_formulario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_formulario",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
}, {
    tableName: "tb_questionario",
    timestamps: true,
    createdAt: false
})

module.exports = Questionario