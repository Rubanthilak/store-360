export default {
    updateCurrentInvoiceTemplate(context,params){
        context.commit("setCurrentPrinterTemplate",params);
        context.commit("setUserSettings");
    },
    updateUserSettings(context){
        context.commit("setUserSettings");
    }
};
