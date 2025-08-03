const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Dominio = sequelize.define("Dominio", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true        
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_questionario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_questionario",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    }
}, {
    tableName: "tb_dominio",
    timestamps: true
})