const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Resposta = sequelize.define("Resposta", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true        
    },
    pontuacao: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    respostaNumerica: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    respostaBooleana: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    respostaTexto: {
        type: DataTypes.STRING,
        allowNull: true
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
    id_candidato: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_candidato",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
    },
    id_questionario: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_questionario",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
    id_questao: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_questao",
            key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL"
    },
}, {
    tableName: "tb_resposta",
    timestamps: true,
    createdAt: "dataResposta"
})