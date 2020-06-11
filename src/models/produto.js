module.exports = (sequelize, DataTypes) => {
    const Produtos = sequelize.define('Produtos', {
        nome: DataTypes.STRING(50),
        descricao: DataTypes.TEXT,
        unidade: DataTypes.STRING(5),
        status: DataTypes.BOOLEAN,
    });

    return Produtos;
}