const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Vaga = sequelize.define("vaga", {
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
    modelo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "tb_vaga",
    timestamps: true
}
)

Vaga.associate = (models) => {
    Vaga.hasOne(models.vagaDescricao, {
        foreignKey: 'id_vaga',
        as: 'descricao'
    });

    Vaga.hasOne(models.vagaBeneficio, {
        foreignKey: 'id_vaga',
        as: 'beneficio'
    });

    Vaga.hasOne(models.vagaProcesso, {
        foreignKey: 'id_vaga',
        as: 'processo'
    });

    Vaga.hasOne(models.vagaRequisicao, {
        foreignKey: 'id_vaga',
        as: 'requisicao'
    });
};

module.exports = Vaga