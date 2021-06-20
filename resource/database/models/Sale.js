import connection from "../helperFunctions/getConnection.js";
import { Payment } from './Payment';

const Sale = connection.sequelize.define("sale", {
  id: {
    field: "saleid",
    type: connection.DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  customerId: {
    type: connection.DataTypes.INTEGER,
    allowNull: true,
  },
  productList: {
    type: connection.DataTypes.JSON,
    allowNull: false,
  },
  billingAddress: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  shippingAddress: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  placeOfSupply: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  poNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  poDate: {
    type: connection.DataTypes.DATEONLY,
    allowNull: true,
  },
  dcNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  dcDate: {
    type: connection.DataTypes.DATEONLY,
    allowNull: true,
  },
  drNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  drDate: {
    type: connection.DataTypes.DATEONLY,
    allowNull: true,
  },
  totalPrice : {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  }
});

Sale.hasMany(Payment);
Payment.belongsTo(Sale);

const formatDate = function(date){
  let result ='';
  result  +=  date.toLocaleString('en-GB', { timeZone: 'IST', year: 'numeric' }) + '-';
  if(date.toLocaleString('en-GB', { timeZone: 'IST', month: 'numeric' }).length === 1){
    result +='0';
  }
  result +=date.toLocaleString('en-GB', { timeZone: 'IST', month: 'numeric' })+'-';
  result += date.toLocaleString('en-GB', { timeZone: 'IST', day: 'numeric' });
  return result;
}

const createTable = async function() {
  await Sale.sync();
};

const getSales = async function(columnToSort,offset,order,date) {
  var sales;
  if(date !== null){
    sales = await Sale.findAndCountAll({
      order: [[columnToSort, order]],
      limit: 25,
      offset: (offset * 25),
      where: connection.sequelize.where(connection.sequelize.fn('date', connection.sequelize.col('Sale.createdAt')), '=', formatDate(date)),
      include: [Payment]
    });
  }else{
    sales = await Sale.findAndCountAll({
      order: [[columnToSort, order]],
      limit: 25,
      offset: (offset * 25),
      include: [Payment]
    });
  }
  return sales;
};

const getSaleById = async function(id) {
    const sale = await Sale.findByPk(id,{include: [Payment]});
    if(sale === null){
      return null;
    }
    return sale;
};

const getSalesCustomerId = async function(cust_id,limit,columnToSort = "id") {
  const sales = await Sale.findAll({
    order: [[columnToSort, "ASC"]],
    where: {
      customerId: cust_id,
    },
    limit:limit
  });
  return sales;
};

const createSale = async function(obj){
    const sale = await Sale.create({
        customerId : obj.customerId,
        productList: obj.productList,
        payments: obj.payments,
        totalPrice: obj.totalPrice
    },{
      include: [ Payment ]
    });
   return sale;
}

const updateSale = async function(obj,id){
  const res = await Sale.update(obj,{
    where: {
      id: id
    }
  });
  return res[0] === 1 ? true : false;
}

const deleteSale = async function(id){
  const res = await Sale.destroy({
    where: {
      id: id
    }
  });
  return res === 1 ? true : false;
}

export default {
  Sale,
  createTable,
  getSales,
  getSaleById,
  getSalesCustomerId,
  createSale,
  updateSale,
  deleteSale
};


