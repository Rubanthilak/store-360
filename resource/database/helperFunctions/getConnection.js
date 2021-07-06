import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db.sqlite",
  logging: false,
});

const connection = {
  sequelize: sequelize,
  Sequelize: Sequelize,
  DataTypes: DataTypes,
};

export default connection;
