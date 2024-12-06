const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

const sequelize = new Sequelize("myDB", "root", "root", {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: console.log, // Log SQL queries
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.userModel = require('../models/userModel.js')(sequelize, Sequelize);

// Sync models to create/update tables
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database using Sequelize.');

        // Automatically create or update tables
        await sequelize.sync({ alter: true });
        console.log('Database synced successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = db;
