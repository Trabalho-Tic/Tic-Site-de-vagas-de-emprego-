const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const BarreiraAcessibilidade = sequelize.define('BarreiraAcessibilidade', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    id_acessibilidade: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_acessibilidade",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    },
    id_barreira: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: "tb_barreira",
            key: "id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    }
}, {
    tableName: "tb_barreiraacessibilidade",
    timestamps: true
})

BarreiraAcessibilidade.associate = (models) => {

    BarreiraAcessibilidade.belongsTo(models.Acessibilidade, {
        foreignKey: 'id_acessibilidade',
        as: 'acessibilidade',
        onDelete: 'CASCADE'
    });

    BarreiraAcessibilidade.belongsTo(models.Barreira, {
        foreignKey: 'id_barreira',
        as: 'barreira',
        onDelete: 'CASCADE'
    });
};

module.exports = BarreiraAcessibilidade