import getTemplateCSS from "../../../resource/const/templateCSS";

export default {
  getCurrentInvoiceTemplate(state) {
    return state.userSettings.defaultTemplate;
  },
  getCSSToPrint(state) {
    if(state.userSettings.defaultPrinter === 1){
      return getTemplateCSS(-1);
    }
    return getTemplateCSS(state.userSettings.defaultTemplate);
  },
  getUserSettings(state){
    return state.userSettings;
  }
};
