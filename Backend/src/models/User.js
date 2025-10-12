const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cpf: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    typeUser: {
        type: DataTypes.STRING,
        allowNull: false
    },
    deficiencias: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: "tb_user",
    timestamps: true
})


module.exports = User