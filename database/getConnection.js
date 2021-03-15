const { Sequelize } = require('sequelize');
const db = new Sequelize({
    dialect: 'sqlite',
    storage: 'd:/database.sqlite'
});

module.exports = db;