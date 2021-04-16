export default {
  setProductList(state, { list }) {
    state.productList.splice(0, state.productList.length);
    state.productList.push(...list);
  },
  setProductIdToDelete(state, id) {
    state.productIdToDelete = id;
  },
};
