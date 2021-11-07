import getTemplateCSS from "../../../resource/const/templateCSS";

export default {
  getCurrentInvoiceTemplate(state) {
    return state.userSettings.defaultTemplate;
  },
  getCSSToPrint(state) {
    return getTemplateCSS(state.userSettings.defaultTemplate);
  },
  getUserSettings(state){
    return state.userSettings;
  }
};
