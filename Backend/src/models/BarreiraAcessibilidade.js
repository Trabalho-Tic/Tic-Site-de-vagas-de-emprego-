const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const BarreiraAcessibilidades = sequelize.define('BarreiraAcessibilidades', {
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
    tableName: "tb_barreiraacessibilidades",
    timestamps: true
})

BarreiraAcessibilidades.associate = (models) => {

    BarreiraAcessibilidades.belongsTo(models.Acessibilidade, {
        foreignKey: 'id_acessibilidade',
        as: 'acessibilidade',
        onDelete: 'CASCADE'
    });

    BarreiraAcessibilidades.belongsTo(models.Barreira, {
        foreignKey: 'id_barreira',
        as: 'barreira',
        onDelete: 'CASCADE'
    });
};

module.exports = BarreiraAcessibilidades