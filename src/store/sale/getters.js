
export default {
    getSales: (state) => {
      return state.saleList;
    },
    getSaleIdToDelete: (state) => {
      return state.saleIdToDelete;
    },
    getTotalSaleCount: (state) => {
      return state.totalSaleCount;
    },
  };