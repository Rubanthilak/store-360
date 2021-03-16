const {Sequelize} = require('sequelize');

const getConnection = function(filePath) {
  const sequelize = new Sequelize({
    username: "root",
    password: "root",
    storage: filePath,
    host: "localhost",
    dialect: "sqlite",
    logging: console.log,
  });
  return sequelize;
};

module.exports = getConnection;
