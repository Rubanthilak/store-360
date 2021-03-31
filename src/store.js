import { createStore } from "vuex";
import productStore from './store/productStore';

// Create a new store instance.
const store = createStore({
  modules : {
    product : productStore
  },
  state() {
    return {
      activePopup: "",
    };
  },
  mutations: {
    setActivePopup(state, currentPopup) {
      state.activePopup = currentPopup;
    },
  },
});

export default store;
