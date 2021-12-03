export default {
    updateCurrentPrinter(context,params){
        context.commit("setCurrentPrinter",params);
        context.commit("setUserSettings");
    },
    updateCurrentInvoiceTemplate(context,params){
        context.commit("setCurrentInvoiceTemplate",params);
        context.commit("setUserSettings");
    },
    updateUserSettings(context){
        context.commit("setUserSettings");
    }
};
