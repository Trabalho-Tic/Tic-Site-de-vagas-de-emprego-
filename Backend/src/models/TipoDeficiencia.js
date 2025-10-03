const { DataTypes } = require("sequelize")
const sequelize = require('../config/database')

const TipoDeficiencia = sequelize.define('TipoDeficiencia', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'tb_tipodeficiencia',
    timestamps: true
})

TipoDeficiencia.associate = (models) => {
    TipoDeficiencia.hasMany(models.SubtipoDeficiencia, {
        foreignKey: "id_tipodeficiencia",
        as: "subtipos"
    });
};

module.exports = TipoDeficiencia