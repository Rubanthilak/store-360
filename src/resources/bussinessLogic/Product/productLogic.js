const { DataTypes } = require('sequelize');
const getConnection = require('../../databaseHelper/getConnection');
const filePath = require('../../constants/filePath')

const sequelize = getConnection(filePath.DEV_DATABASE_FILEPATH_LOCATION);
const Product = new Product(sequelize, DataTypes);

const getProducts = async function(){
    const products = await Product.findAll();
    return products;
}

const getProductById = function(id){
    console.log(id)
}

const createProductFromObj = function(product){
    console.log(product)
}

const updateProductById = function(id){
    console.log(id)
}

const deleteProductById = function(id){
    console.log(id)
}

module.exports = {
    getProducts : getProducts,
    getProductById : getProductById,
    createProductFromObj : createProductFromObj,
    updateProductById : updateProductById,
    deleteProductById : deleteProductById
}