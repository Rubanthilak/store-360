import { createStore } from "vuex";
import productStore from "./product/index.js";
import customerStore from "./customer/index.js";
import saleStore from "./sale/index.js";
import { checkAuthentication } from "../../resource/plugins/googleDrive";
import getTemplateCSS from "../../resource/const/templateCSS";
import fs from "fs";
// import path from 'path';

// Create a new store instance.
const store = createStore({
  modules: {
    product: productStore,
    customer: customerStore,
    sale: saleStore,
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
    setCurrentPrinterTemplate(state, params) {
      const jsonString = fs.readFileSync("./userSettings.json");
      const userSettings = JSON.parse(jsonString);
      userSettings.defaultTemplate = params;
      // console.log(path.resolve("./resource/config/userSettings.json"));
      fs.writeFileSync("./userSettings.json", JSON.stringify(userSettings));
    },
  },
  getters: {
    checkGoogleSignIn() {
      let res = checkAuthentication();
      return res;
    },
    getCurrentPrinterTemplate() {
      const jsonString = fs.readFileSync("./userSettings.json");
      const userSettings = JSON.parse(jsonString);
      return userSettings.defaultTemplate;
    },
    getCSSToPrint() {
      const jsonString = fs.readFileSync("./userSettings.json");
      const userSettings = JSON.parse(jsonString);
      return getTemplateCSS(userSettings.defaultTemplate);
    },
  },
});

export default store;
