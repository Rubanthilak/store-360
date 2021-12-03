import { Sequelize, DataTypes } from "sequelize";

var config = {
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
}

console.log(config); 

const sequelize = new Sequelize(config);

const connection = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  DataTypes: DataTypes,
};

export default connection;
