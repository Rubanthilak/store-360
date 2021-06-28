import connection from "../helperFunctions/getConnection.js";

const Payment = connection.sequelize.define("payment", {
  id: {
    field: 'paymentId', 
    type: connection.DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  paymentMethod: {
    type: connection.DataTypes.ENUM,
    values: ["Card", "Cash", "UPI", "Cheque"],
    allowNull: false,
  },
  amountPaid: {
    type: connection.DataTypes.FLOAT,
    allowNull: true,
  },
  transactionNumber: {
    type: connection.DataTypes.STRING,
    allowNull: true,
  },
  dateOfTransaction: {
    type: connection.DataTypes.DATEONLY,
    allowNull: true,
  },
  saleId: {
    type: connection.DataTypes.INTEGER,
    allowNull: true,
  }
});

const createTable = async function() {
    await Payment.sync();
};

const createPayment = async function(obj) {
  const res = await Payment.create(obj)
  return res;
}

export { Payment };

export default { 
  createTable,
  createPayment
}