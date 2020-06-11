module.exports = (sequelize, DataTypes) => {
    const Telefones = sequelize.define('Telefones', {
        nome: DataTypes.STRING(20),
        numero: DataTypes.STRING(20)
        // clienteId: DataTypes.INTEGER,
    });

    Telefones.associate = function (models) {
        Telefones.belongsTo(models.Clientes, {foreignKey: 'clienteId', as: 'cliente'})
    };

    return Telefones;
}