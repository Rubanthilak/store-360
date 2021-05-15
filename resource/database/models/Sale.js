import connection from "../helperFunctions/getConnection.js";

const Sale = connection.sequelize.define("Sale", {
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
  paymentMethod: {
    type: connection.DataTypes.ENUM,
    values: ["Card", "Cash", "UPI", "Split","Unpaid"],
    allowNull: false,
  },
  cashAmount: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  cardAmount: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  upiAmount: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  unpaidAmount: {
    type: connection.DataTypes.FLOAT,
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
  }
});

const createTable = async function() {
  await Sale.sync();
};

const getSales = async function(columnToSort = "id") {
  const sales = await Sale.findAll({
    order: [[columnToSort, "ASC"]],
  });
  return sales;
};

const getSaleById = async function(id) {
    const sale = await Sale.findByPk(id);
    return sale.dataValues;
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
        paymentMethod : obj.paymentMethod,
        cashAmount: obj.cashAmount,
        cardAmount: obj.cardAmount,
        upiAmount: obj.upiAmount,
        unpaidAmount: obj.unpaidAmount,
        productList: obj.productList,
    });
   return sale.dataValues;
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


