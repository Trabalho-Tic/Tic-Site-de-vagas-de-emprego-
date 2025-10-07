const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Acessibilidade = sequelize.define('Acessibilidade', {
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
    tableName: "tb_acessibilidade",
    timestamps: true
})

Acessibilidade.associate = (models) => {
    
    Acessibilidade.belongsToMany(models.Barreira, {
      through: "tb_barreiraacessibilidade",
      foreignKey: 'id_acessibilidade',
      otherKey: 'id_barreira',
      as: 'barreiras'
    });

};

module.exports = Acessibilidade