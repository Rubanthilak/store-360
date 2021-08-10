var fs = require("fs");
var path = require("path");
// var app = require("electron").remote.app;
var yazl = require("yazl");
// var appUserDataPath = app.getPath('userData');
var isOnline = require("is-online");

import { initiateAuthentication, uploadFile } from "./googleDrive";

async function backupDatabase() {
  let IS_ONLINE = await isOnline();
  if (IS_ONLINE) {
    var selectedFile = "./db.sqlite";
    var selectedFileName = path.normalize(selectedFile);
    selectedFileName = path.basename(selectedFileName);
    var zipFileName = "Store360Backup.zip";
    var zipfile = new yazl.ZipFile();
    try {
        zipfile.addFile(selectedFile, selectedFileName);
        zipfile.outputStream.pipe(fs.createWriteStream("./" + zipFileName))
        zipfile.end();
        initiateAuthentication(uploadFile, {
          filePathForBackup: "D:/Code/Project/Vuejs/store360/" + zipFileName,
          fileName: new Date().toString() + '.s360',
        });
        return {result: true};
    } catch (error) {
        return {result: false, message: error};
    }
  }
  else{
    return {result: false, message: 'Check your Internet Connection'}
  }
}

export default backupDatabase;
