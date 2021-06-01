export default {
  setSaleList(state, list) {
    state.saleList.splice(0, state.saleList.length);
    state.saleList.push(...list);
  },
  setSaleIdToDelete(state, id) {
    state.saleIdToDelete = id;
  },
  setTotalSaleCount(state, count) {
    state.totalSaleCount = count;
  },
};
