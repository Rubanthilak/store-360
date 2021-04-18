import Database from "../../../resource/Database";

export default {
  async getCustomerList(context,columnToSort) {
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
};
