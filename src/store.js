import { createStore } from "vuex";
const productLogic = require("./resources/bussinessLogic/Product/productLogic");

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
  },
  actions : {
    getProductList({ commit }){
        var response = productLogic.getProducts
        commit('setProductList',response)
    }
  }
});

export default store;
