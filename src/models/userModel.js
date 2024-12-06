// userModel.js
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('User', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        // Add any other fields you need
    });

    return User;
};
