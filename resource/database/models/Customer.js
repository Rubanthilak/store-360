import connection from "../helperFunctions/getConnection.js";

const Customer = connection.sequelize.define("Customer", {
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
  customerCreditPoint: {
    type: connection.DataTypes.NUMBER,
    allowNull: false,
  },
  customerUnpaidBalance: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
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

const createTable = async function() {
  await Customer.sync();
};

const getCustomers = async function(columnToSort,offset,limit) {
  const customers = await Customer.findAndCountAll({
    order: [[columnToSort, "ASC"]],
    limit: limit,
    offset: (offset * 25)
  });

  return customers;
};

const getCustomerById = async function(id) {
  const customer = await Customer.findByPk(id);
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
  const res = await Customer.destroy({
    where: {
      id: id,
    },
  });
  return res === 1 ? true : false;
};

const updateCustomer = async function(obj, id) {
  const res = await Customer.update(obj, {
    where: {
      id: id,
    },
  });
  return res[0] === 1 ? true : false;
};

export default {
  Customer,
  createTable,
  getCustomers,
  getCustomerById,
  createCustomer,
  deleteCustomer,
  updateCustomer,
};
