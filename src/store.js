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
      activeSnackBar : {
        visible : false,
        text : null
      }
    };
  },
  mutations: {
    setActivePopup(state, currentPopup) {
      state.activePopup = currentPopup;
    },
    showSnackBar(state,toastText){
      state.activeSnackBar.visible = true;
      state.activeSnackBar.text = toastText;
      setTimeout(()=>{
        state.activeSnackBar.visible = false;
        state.activeSnackBar.text = null;
      },3000);
    }
  },
});

export default store;
