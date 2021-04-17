import connection from '../helperFunctions/getConnection';

const Customer = connection.sequelize.define('Customer', {
  id: {
    type: connection.DataTypes.INTEGER,
    allowNull: false,
    field: "customerId",
    autoIncrement: true
  },
  customerName: {
    type: connection.DataTypes.STRING,
    allowNull: false
  },
  customerNumber: {
    type: connection.DataTypes.NUMBER,
    primaryKey: true,
    allowNull: false
  },
  customerCreditPoint: {
    type: connection.DataTypes.NUMBER,
    allowNull: false
  },
  customerUnpaidBalance: {
    type: connection.DataTypes.FLOAT,
    allowNull: true
  },
  customerAddress: {
    doorNumber: {
      type: connection.DataTypes.STRING,
      allowNull: false
    },
    streetName: {
      type: connection.DataTypes.STRING,
      allowNull: false
    },
    areaName: {
      type: connection.DataTypes.STRING,
      allowNull: false
    },
    landMark: {
        type: connection.DataTypes.STRING,
        allowNull: false
      },
    pincode: {
        type: connection.DataTypes.NUMBER,
        allowNull: false
      },
  },
});

const createTable = async function(){
  await Customer.sync()
}

const getCustomer = async function(columnToSort='id'){
  const customers = await Cutomer.findAll({
      order: [[columnToSort, 'ASC']]
    }
  );
  return Customer;
}