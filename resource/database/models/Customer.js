import connection from "../helperFunctions/getConnection.js";
import { Payment } from "./Payment.js";
import {Sale} from "./Sale.js";

const sequelize = connection.sequelize;

const Customer = sequelize.define("customer", {
  id: {
    type: connection.DataTypes.INTEGER,
    allowNull: false,
    field: "customerId",
    autoIncrement: true,
    primaryKey: true,
  },
  customerName: {
    type: connection.DataTypes.STRING,
    allowNull: false,
  },
  customerPhoneNumber: {
    type: connection.DataTypes.NUMBER,
    allowNull: false,
    unique: true,
  },
  customerAlternatePhoneNumber: {
    type: connection.DataTypes.NUMBER,
    allowNull: true,
    unique: true,
  },
  customerCreditPoint: {
    type: connection.DataTypes.NUMBER,
    allowNull: false,
  },
  customerDoorNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerStreetName: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerCityName: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerStateName: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerPincode: {
    type: connection.DataTypes.NUMBER,
    allowNull: true,
  },
  customerShippingDoorNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerShippingStreetName: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerShippingCityName: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerShippingStateName: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerShippingPincode: {
    type: connection.DataTypes.NUMBER,
    allowNull: true,
  },
  customerGstinNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  customerArchived: {
    type: connection.DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: true,
  },
  fullAddress: {
    type: connection.DataTypes.VIRTUAL,
    get() {
      return `${this.doorNumber} ${this.streetName} ${this.cityName} ${this.pincode}`;
    },
    set(value) {
      throw new Error(value + " : Do not try to set the `fullAddress` value!");
    },
  },
});

Customer.hasMany(Sale);
Sale.belongsTo(Customer);

const createTable = async function() {
  await Customer.sync();
};

const getCustomers = async function(columnToSort,offset,limit) {
  const customers = await Customer.findAndCountAll({
    order: [[columnToSort, "ASC"]],
    limit: limit,
    offset: (offset * limit),
    where: {
      customerArchived: false,
    },
  });

  return customers;
};

const getCustomerById = async function(id) {
  const customer = await Customer.findByPk(id,{
    include: [ {
      model: Sale,
      attributes: [
        [sequelize.fn('sum', sequelize.col('totalPrice')), 'customerTotalPurchase']
      ],
      include: [ {
        model: Payment,
        attributes: [
          [sequelize.fn('sum', sequelize.col('amountPaid')), 'customerAmountPaid']
        ] 
     }]
   }]
  });
  customer.dataValues.customerUnpaidBalance = customer.sales[0].dataValues.customerTotalPurchase - customer.sales[0].payments[0].dataValues.customerAmountPaid;
  return customer.dataValues;
};

const createCustomer = async function(obj) {
  try {
    const customer = await Customer.create({
      customerName: obj.customerName,
      customerPhoneNumber: obj.customerPhoneNumber,
      customerCreditPoint: obj.customerCreditPoint,
      customerUnpaidBalance: obj.customerUnpaidBalance,
      customerDoorNumber: obj.customerDoorNumber,
      customerStreetName: obj.customerStreetName,
      customerCityName: obj.customerCityName,
      customerStateName: obj.customerStateName,
      customerPincode: obj.customerPincode,
      customerGstinNumber: obj.customerGstinNumber,
    });
    return customer.dataValues;
  } catch (err) {
    if("SequelizeUniqueConstraintError: Validation error" === err.toString()){
      return false;
    }
  }
};

const deleteCustomer = async function(id) {
  const res = await Customer.update({customerArchived: true}, {
    where: {
      id: id,
    },
  });
  return res[0] === 1 ? true : false;
};

const updateCustomer = async function(obj, id) {
  const res = await Customer.update(obj, {
    where: {
      id: id,
    },
  });
  return res[0] === 1 ? true : false;
};

export { Customer };

export default {
  Customer,
  createTable,
  getCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
