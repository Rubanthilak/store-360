import Database from "../../../resource/database/Database";

const paymentOptions = ["Card", "Cash", "UPI", "Split"];

export default { 
  async getSalesList(context,offset = 0,columnToSort = "id"){
    const sales = await Database.Model.Sale.getSales(columnToSort,offset);
    var tempList = [];
    sales.rows.forEach(sale => {
      tempList.push(sale.dataValues)
    })
    context.commit("setSaleList", tempList);
    context.commit("setTotalSaleCount", sales.count);
  },
  async getSalesByCustomerId(context,obj){
    const sale = await Database.Model.Sale.getSalesCustomerId(obj.cust_id,obj.limit)
    return sale;
  },
  async postSale(context, obj) {
    const sale = await Database.Model.Sale.createSale({
      customerId : obj.customer.id,
      paymentMethod : paymentOptions[obj.paymentMethod.method],
      cashAmount: obj.paymentMethod.amount.cash,
      cardAmount: obj.paymentMethod.amount.card,
      upiAmount: obj.paymentMethod.amount.upi,
      unpaidAmount: obj.paymentMethod.amount.unpaid,
      productList: obj.productList,
    });
    return sale;         
  },
  async updateSale(context, obj) {
    const res = await Database.Model.Sale.updateSale(obj,obj.id);
    return res;         
  },
};
  