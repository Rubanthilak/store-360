import Database from "../../../resource/database/Database";

export default {
  async getCustomerList(context, {columnToSort="id", offset=0,limit=null}) {
    const list = await Database.Model.Customer.getCustomers(columnToSort,offset,limit);
    var tempList = [];
    list.rows.forEach(sale => {
      tempList.push(sale.dataValues)
    });
    context.commit("setCustomerList", tempList);
    context.commit("setTotalCustomerCount", list.count);
  },
  async getCustomerById(context, id) {
    const customer = await Database.Model.Customer.getCustomerById(id);
    return customer;
  },
  async postCustomer(context, obj) {
    const customer = await Database.Model.Customer.createCustomer(obj);
    return customer;
  },
  async deleteCustomer(context, id) {
    const res = await Database.Model.Customer.deleteCustomer(id);
    return res;
  },
  async updateCustomer(context, obj) {
    const res = await Database.Model.Customer.updateCustomer(obj, obj.id);
    return res;
  },
};
