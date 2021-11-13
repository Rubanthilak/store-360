import fs from "fs";

export default {
  setUserSettings(state){
    const jsonString = fs.readFileSync("./userSettings.json");
    state.userSettings = JSON.parse(jsonString);
  },
  setCurrentPrinterTemplate(state, params) {
    state.userSettings.defaultTemplate = params;
    fs.writeFileSync("./userSettings.json", JSON.stringify(state.userSettings));
  },
}