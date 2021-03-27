import { createStore } from "vuex";
import Database from "../resource/Database";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      productList: [],
      activePopup: "",
    };
  },
  mutations: {
    setProductList(state, { list }) {
      state.productList.splice(0,state.productList.length);
      state.productList.push(...list);
    },
    setActivePopup(state, currentPopup) {
      state.activePopup = currentPopup;
    },
  },
  actions: {
    async getProductList(context) {
      const list = await Database.Model.Product.getProducts();
      context.commit("setProductList", { list });
    },
    async postProduct(context, obj) {
      const product = await Database.Model.Product.createProduct(obj);
      await context.dispatch("getProductList");
      return product;
    },
    async updateProduct(context, obj) {
      const res = await Database.Model.Product.updateProduct(
        {
          productQuantity: obj.unit,
          productMrpPrice: parseFloat(
            obj.mrp_price.rupee + "." + obj.mrp_price.paisa
          ),
          productSellingPrice: parseFloat(
            obj.selling_price.rupee + "." + obj.selling_price.paisa
          ),
        },
        obj.id
      );
      return res;
    },
    async deleteProduct(context, obj) {
      const res = await Database.Model.Product.deleteProduct(obj.id);
      await context.dispatch("getProductList");
      return res;
    },
  },
});

export default store;
