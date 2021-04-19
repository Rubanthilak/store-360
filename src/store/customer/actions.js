import Database from "../../../resource/Database";

export default {
  async getCustomerList(context, columnToSort) {
    const list = await Database.Model.Customer.getCustomers(columnToSort);
    context.commit("setCustomerList", { list });
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
    console.log(obj);
    const res = await Database.Model.Customer.updateCustomer(obj, obj.id);
    return res;
  },
};
