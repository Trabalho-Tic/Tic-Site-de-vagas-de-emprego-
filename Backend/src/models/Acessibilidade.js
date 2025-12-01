const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Acessibilidade = sequelize.define('Acessibilidade', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "tb_acessibilidade",
    timestamps: true
});

Acessibilidade.associate = (models) => {

    Acessibilidade.belongsToMany(models.Barreira, {
    through: "tb_barreiraacessibilidade",
    foreignKey: "id_acessibilidade",
    otherKey: "id_barreira",
    as: "barreiras"
        });

    // 🔥 Nova relação
    Acessibilidade.belongsToMany(models.SubTipoBarreiras, {
        through: "tb_subtipobarreira_acessibilidade",
        foreignKey: "id_acessibilidade",
        otherKey: "id_subtipobarreira",
        as: "subtiposBarreiras"
    });

    // 🔥 Nova relação de vagas
    Acessibilidade.belongsToMany(models.Vaga, {
        through: "tb_vaga_acessibilidade",
        foreignKey: "id_acessibilidade",
        otherKey: "id_vaga",
        as: "vagas"
    });
};

module.exports = Acessibilidade;
