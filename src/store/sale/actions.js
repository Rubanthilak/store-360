import Database from "../../../resource/database/Database";

const paymentOptions = ["Card", "Cash", "UPI"];

function generatePaymentArray(obj,customerId){
  var arr = []
  if(obj.method === 4){
    return arr;
  }
  if(obj.amount.card !== null && obj.amount.card !== ''){
    let payment = {
      paymentMethod : paymentOptions[0],
      amountPaid : obj.amount.card,
      dateOfTransaction : new Date(),
      customerId: customerId
    }
    arr.push(payment);
  }
  if(obj.amount.cash !== null && obj.amount.cash !== ''){
    let payment = {
      paymentMethod : paymentOptions[1],
      amountPaid : obj.amount.cash,
      dateOfTransaction : new Date(),
      customerId: customerId
    }
    arr.push(payment);
  }
  if(obj.amount.upi !== null && obj.amount.upi !== ''){
    let payment = {
      paymentMethod : paymentOptions[2],
      amountPaid : obj.amount.upi,
      dateOfTransaction : new Date(),
      customerId: customerId
    }
    arr.push(payment);
  }
  return arr;
}

export default { 
  async getSalesList(context,{columnToSort ="id", offset=0, order='DESC',date=null}){
    const sales = await Database.Model.Sale.getSales(columnToSort,offset,order,date);
    var tempList = [];
    sales.rows.forEach(sale => {
      let temp = {
        ...sale.dataValues,
        payments: [],
        totalAmountPaid: 0
      }
      sale.payments.forEach(payment => {
        temp.payments.push(payment.dataValues)
        temp.totalAmountPaid += payment.dataValues.amountPaid
      })
      tempList.push(temp)
    });
    context.commit("setSaleList", tempList);
    context.commit("setTotalSaleCount", sales.count);
  },
  async getSalesById(context,id){
    const sale = await Database.Model.Sale.getSaleById(id)
    let temp = {
      ...sale.dataValues,
      payments: [],
      totalAmountPaid: 0
    }
    sale.payments.forEach(payment => {
      temp.payments.push(payment.dataValues)
      temp.totalAmountPaid += payment.dataValues.amountPaid
    })
    return temp;
  },
  async getSalesByCustomerId(context,obj){
    const sales = await Database.Model.Sale.getSalesCustomerId(obj.cust_id,obj.limit);
    var tempList = [];
    sales.forEach(sale => {
      let temp = {
        ...sale.dataValues,
        totalAmountPaid: 0
      }
      sale.payments.forEach(payment => {
        temp.totalAmountPaid += payment.dataValues.amountPaid
      })
      tempList.push(temp)
    });
    return tempList;
  },
  async getChartDataByCustomerId(context,obj){
    const sales = await Database.Model.Sale.getChartDataByCustomerId(obj.cust_id);
    var tempList = new Array(12);
    sales.forEach(sale => {
      tempList[parseInt(sale.dataValues.month) - 1] = sale.dataValues.totalPrice;
    });
    return tempList;
  },
  async postSale(context, obj) {
    const payments = generatePaymentArray(obj.paymentMethod,obj.customer.id);
    const sale = await Database.Model.Sale.createSale({
      customerId : obj.customer.id,
      productList: obj.productList,
      totalPrice: obj.totalPrice,
      payments: payments
    });
    let temp = {
      ...sale.dataValues,
      payments: [],
      totalAmountPaid: 0.00
    }
    sale.payments.forEach(payment => {
      temp.payments.push(payment.dataValues)
      temp.totalAmountPaid += parseFloat(payment.dataValues.amountPaid)
    });
    console.log(temp);
    return temp;         
  },
  async updateSale(context, obj) {
    const res = await Database.Model.Sale.updateSale(obj,obj.id);
    return res;         
  },
  async addPayment(context,obj){
    const res = await Database.Model.Payment.createPayment(obj);
    return res;
  }
};
  