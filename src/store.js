import { createStore } from 'vuex'
import Database from '../resource/Database';

// Create a new store instance.
const store = createStore({
  state () {
    return {
      productList:[]
    }
  },
  mutations: {
    setProductList (state,{list}){
        state.productList = list;
    }
  },
  actions: {
      async getProductList (context){
        const list = await Database.Model.Product.getProducts();
        context.commit('setProductList',{list})
      }
  }
})

export default store;