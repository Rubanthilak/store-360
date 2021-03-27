import connection from '../helperFunctions/getConnection';

const Product = connection.sequelize.define('Product', {
  id: {
    type: connection.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    field: "productId",
    autoIncrement: true
  },
  productName: {
    type: connection.DataTypes.STRING,
    allowNull: false
  },
  productQuantity: {
    type: connection.DataTypes.NUMBER,
    allowNull: false
  },
  productMrpPrice: {
    type: connection.DataTypes.FLOAT,
    allowNull: false
  },
  productSellingPrice: {
    type: connection.DataTypes.FLOAT,
    allowNull: false
  },
  productBarcode: {
    type: connection.DataTypes.NUMBER,
    allowNull: false
  },
  productArchived: {
    type: connection.DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true
  }
});

const createTable = async function(){
  await Product.sync()
}

const getProducts = async function(){
  const products = await Product.findAll();
  return products;
}

const createProduct = async function(obj){
    const product = await Product.create({
      productName: obj.productName,
      productQuantity : obj.productQuantity,
      productMrpPrice : obj.productMrpPrice,
      productSellingPrice : obj.productSellingPrice,
      productBarcode: obj.productBarcode
  })
  return product.dataValues;
}

export default {
  createTable:createTable,
  createProduct:createProduct,
  getProducts:getProducts
}