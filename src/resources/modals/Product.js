module.exports = function(sequelize, DataTypes) {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'productId',
      autoIncrement: true 
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productUnit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productCostPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productSellingPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    productBarCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productArchived: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
  return Product;
};

