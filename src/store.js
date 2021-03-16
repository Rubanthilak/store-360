import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      productList: null,
    };
  },
  mutations: {
    setProductList(state, list) {
      state.productList = list;
    },
  }
});

export default store;
