import { createStore } from "vuex";
import productStore from "./product/index.js";
import customerStore from "./customer/index.js";
import settingStore from "./setting/index.js";
import saleStore from "./sale/index.js";
import { checkAuthentication } from "../../resource/plugins/googleDrive";

// Create a new store instance.
const store = createStore({
  modules: {
    product: productStore,
    customer: customerStore,
    sale: saleStore,
    setting: settingStore
  },
  state() {
    return {
      activePopup: "",
      activeSnackBar: {
        visible: false,
        text: null,
      },
    };
  },
  mutations: {
    setActivePopup(state, currentPopup) {
      state.activePopup = currentPopup;
    },
    showSnackBar(state, toastText) {
      state.activeSnackBar.visible = true;
      state.activeSnackBar.text = toastText;
      setTimeout(() => {
        state.activeSnackBar.visible = false;
        state.activeSnackBar.text = null;
      }, 3000);
    },
  },
  getters: {
    checkGoogleSignIn() {
      let res = checkAuthentication();
      return res;
    },
  },
});

export default store;
