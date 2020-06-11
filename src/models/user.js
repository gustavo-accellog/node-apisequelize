const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
    }, {
        hooks: {
            beforeCreate: async (user) => {
                const hash = await bcrypt.hash(user.password, 10);
                user.password =  hash;
            }
        }
    });

    return User;
}