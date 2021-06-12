export default {
      setCustomerList(state,list) {
        state.customerList.splice(0, state.customerList.length);
        state.customerList.push(...list);
      },
      setCustomerIdToDelete(state, id) {
        state.customerIdToDelete = id;
      },
      setTotalCustomerCount(state, count) {
        state.totalCustomerCount = count;
      },
}