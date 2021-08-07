// var fs = require("fs");
// var path = require("path");
// // var app = require("electron").remote.app;
// var yazl = require('yazl');
// var appUserDataPath = app.getPath('userData');
var isOnline = require('is-online');



import { initiateAuthentication, uploadFile } from './googleDrive';

async function backupDatabase() {
    let IS_ONLINE = await isOnline();
    if(IS_ONLINE){
        // var selectedFile = "./db.sqlite";
        // var selectedFileName = path.normalize(selectedFile);
		// selectedFileName = path.basename(selectedFileName);
        // var zipFileName = 'Store360Backup.zip';
        // var zipfile = new yazl.ZipFile();
        // zipfile.addFile(selectedFile, selectedFileName);
        // zipfile.outputStream.pipe(fs.createWriteStream( './' + zipFileName)).on('close', initiateAuthentication(uploadFile,{fileNameForBackup: './Store360Backup.zip'})).on('error', console.log("failed"));
        // zipfile.end();
        initiateAuthentication(uploadFile,{fileNameForBackup: './db.zip'})
    }
}

export default backupDatabase;
