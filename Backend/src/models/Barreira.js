const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Barreira = sequelize.define('Barreira', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: "tb_barreira",
    timestamps: true
})

Barreira.associate = (models) => {
    
    Barreira.belongsToMany(models.SubtipoDeficiencia, {
      through: "tb_subtipobarreira",
      foreignKey: 'id_barreira',
      otherKey: 'id_subtipodeficiencia',
      as: 'subtipos'
    });
    
    Barreira.belongsToMany(models.Acessibilidade, {
    through: "tb_barreiraacessibilidade",
    foreignKey: "id_barreira",
    otherKey: "id_acessibilidade",
    as: "acessibilidades"
    });

  };

module.exports = Barreira