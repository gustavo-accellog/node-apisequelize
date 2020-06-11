module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Produtos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      descricao: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      unidade: {
        allowNull: false,
        type: DataTypes.STRING(5),
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
    return queryInterface.dropTable('Produtos');
  }
};
