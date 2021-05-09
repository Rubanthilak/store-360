import Database from "../../../resource/database/Database";

const paymentOptions = ["Card", "Cash", "UPI", "Split"];

export default { 
  async postSale(context, obj) {
    await Database.Model.Sale.createTable();
    const sale = await Database.Model.Sale.createSale({
      customerId : obj.customer.id,
      paymentMethod : paymentOptions[obj.paymentMethod.method],
      cashAmount: obj.paymentMethod.amount.cash,
      cardAmount: obj.paymentMethod.amount.card,
      upiAmount: obj.paymentMethod.amount.upi,
      stateTax: 8,
      centralTax: 8, //in future read from settings.json
      productList: obj.productList,
    });
    return sale;         
  },
};
  