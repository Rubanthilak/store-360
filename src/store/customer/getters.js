export default {
  getCustomers: (state) => {
    return state.customerList;
  },
  getCustomerIdToDelete: (state) => {
    return state.customerIdToDelete;
  },
  
  getTotalCustomerCount: (state) => {
    return state.totalCustomerCount;
  },
};
