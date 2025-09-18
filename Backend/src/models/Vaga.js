import sequelize from "../config/database";
import { DataTypes, UUID } from "sequelize";

const Vaga = sequelize.define("tb_vaga", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pais: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_processo: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_vagaprocesso",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_decricao: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_vagadecricao",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_requisicao: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_vagarequisicao",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_beneficio: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_vagabeneficio",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    
}, {
    tableName: "tb_vaga",
    timestamps: true
}
)

export default Vaga