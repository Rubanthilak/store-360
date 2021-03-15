const sequelize = require("../getConnection");
const { DataTypes } = require("sequelize");

const Product = sequelize.define('Product', {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productUnit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productCostPrice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productSellingPrice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    productBarCode: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }
);

module.exports = Product;