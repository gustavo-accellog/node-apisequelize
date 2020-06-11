const validaCpf = require('../../middlewares/validaCpf');

module.exports = (sequelize, DataTypes) => {
    const Clientes = sequelize.define('Clientes', {
        nome: DataTypes.STRING(100),
        cpf: {
            type: DataTypes.STRING(15),
            validate: {
                isCpf(value) {
                    if (validaCpf(value)) {
                        throw new Error('CPF Inválido.');
                    }
                }
            }
        },
        aniversario: DataTypes.DATE,
        status: DataTypes.BOOLEAN,
    });

    Clientes.associate = function (models) {
        Clientes.hasMany(models.Telefones, { as: 'telefones', foreignKey: 'clienteId' })
    };

    return Clientes;
}