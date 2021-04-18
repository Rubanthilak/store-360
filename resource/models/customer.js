import connection from "../helperFunctions/getConnection";

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
    unique : true
  },
  customerCreditPoint: {
    type: connection.DataTypes.NUMBER,
    allowNull: false,
  },
  customerUnpaidBalance: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  doorNumber: {
    type: connection.DataTypes.STRING,
    allowNull: false,
  },
  streetName: {
    type: connection.DataTypes.STRING,
    allowNull: false,
  },
  landMark: {
    type: connection.DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: connection.DataTypes.NUMBER,
    allowNull: false,
  },
});

const createTable = async function() {
  await Customer.sync();
};

const getCustomers = async function(columnToSort = "id") {
  const customers = await Customer.findAll({
    order: [[columnToSort, "ASC"]],
  });

  return customers;
};

export default  {
  createTable,
  getCustomers
}