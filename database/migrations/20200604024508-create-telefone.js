module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Telefones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      numero: {
        allowNull: false,
        type: DataTypes.STRING(20),
      },
      clienteId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Clientes',
          key: 'id',
        }
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('Telefones');
  }
};