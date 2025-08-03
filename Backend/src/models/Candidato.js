const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Candidato = sequelize.define("Candidato", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true        
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataNascimento: {
        type: DataTypes.STRING,
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
    },
    id_endereco: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_endereco",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
}, {
    tableName: "tb_candidato",
    timestamps: true,
})