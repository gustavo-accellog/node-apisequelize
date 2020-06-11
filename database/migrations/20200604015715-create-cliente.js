module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Clientes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      cpf: {
        allowNull: false,
        type: DataTypes.STRING(15),
        unique: true,
      },
      aniversario: {
        allowNull: true,
        type: DataTypes.DATE,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    return queryInterface.dropTable('Clientes');
  }
};