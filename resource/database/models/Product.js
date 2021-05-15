import connection from '../helperFunctions/getConnection.js';

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
  productHscNumber: {
    type: connection.DataTypes.NUMBER,
    allowNull: true
  },
  productBaseUnit: {
    type: connection.DataTypes.STRING,
    allowNull: true
  },
  productSecondaryUnit: {
    type: connection.DataTypes.STRING,
    allowNull: true
  },
  productUnitRatio: {
    type: connection.DataTypes.NUMBER,
    allowNull: true
  },
  productStock: {
    type: connection.DataTypes.NUMBER,
    allowNull: true
  },
  productTaxType: {
    type: connection.DataTypes.ENUM,
    values: ["GST", "IGST"],
    allowNull: true,
    defaultValue: 'GST'
  },
  productTaxPercentage: {
    type: connection.DataTypes.FLOAT,
    defaultValue: 18
  },
  productMrpPrice: {
    type: connection.DataTypes.FLOAT,
    allowNull: false,
  },
  productSellingPrice: {
    type: connection.DataTypes.FLOAT,
    allowNull: false
  },
  productBarcode: {
    type: connection.DataTypes.NUMBER,
    allowNull: true
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

const getProducts = async function(columnToSort='id'){
  const products = await Product.findAll({
      order: [[columnToSort, 'ASC']]
    }
  );
  return products;
}

const getProductById = async function(id){
    const product = await Product.findByPk(id);
    return product;
}

const createProduct = async function(obj){
    const product = await Product.create({
      productName: obj.productName,
      productBaseUnit : obj.productBaseUnit,
      productSecondaryUnit : obj.productSecondaryUnit,
      productUnitRatio : obj.productUnitRatio,
      productMrpPrice : obj.productMrpPrice,
      productSellingPrice : obj.productSellingPrice,
      productBarcode: obj.productBarcode,
      productHscNumber: obj.productHscNumber,
      productTaxType: obj.productTaxType,
      productTaxPercentage: obj.productTaxPercentage,
      productStock: obj.productStock,
  });
  return product.dataValues;
}

const createBulkProduct = async function(list){
    await Product.bulkCreate(list);
    return await Product.findAll({
      order: [['id', 'ASC']]
    });
}

const deleteProduct = async function(id){
  const res = await Product.destroy({
    where: {
      id: id
    }
  });
  return res === 1 ? true : false;
}

const updateProduct = async function(obj,id){
  const res = await Product.update(obj,{
    where: {
      id: id
    }
  });
  return res[0] === 1 ? true : false;
}


export default {
  createTable:createTable,
  createProduct:createProduct,
  createBulkProduct:createBulkProduct,
  getProducts:getProducts,
  deleteProduct:deleteProduct,
  updateProduct:updateProduct,
  getProductById:getProductById
}
