import getters from "./getters";
import actions from "./actions";
import mutations from "./mutations";

const state = function() {
  return {
    customerList: [],
    customerIdToDelete: null,
  };
};

const namespaced = true;

export default {
  namespaced,
  state,
  getters,
  actions,
  mutations,
};
