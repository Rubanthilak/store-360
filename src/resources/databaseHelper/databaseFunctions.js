const { DataTypes } = require('sequelize');
const getConnection = require('./getConnection');
const filePath = require('../constants/filePath')

const Product = require('../modals/Product')

//Initialize a Database with all the tables and returns the connection to the database
const initializeDatabase = async function() {
    const sequelize = getConnection(filePath.DEV_DATABASE_FILEPATH_LOCATION);
    // 🚩 Creates Table in the Database object (The above sequelize is the Database Connection/Object) 
    new Product(sequelize, DataTypes);
    return sequelize;
}

//Sync all the Tables from the Database object to the Database file i.e: db.sqlite
const synchronizeDatabase = async function(sequelize){
    await sequelize.sync();
}

module.exports = {
    initializeDatabase : initializeDatabase,
    synchronizeDatabase: synchronizeDatabase
};