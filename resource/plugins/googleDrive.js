var _setImmediate2 = require("babel-runtime/core-js/set-immediate");

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const fs = require("fs");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";
var CLIENT_SECRET_PATH = "./credentials.json";
var CLIENT_SECRET = null;

/**
 * @param {function} callback A function need to passed as callback to execute after authentication.
 */
function initiateAuthentication(callback, params) {
  // Load client secrets from a local file.
  fs.readFile(CLIENT_SECRET_PATH, (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    CLIENT_SECRET = JSON.parse(content); 
    authorize(CLIENT_SECRET, callback, params);
  });
}

function checkAuthentication() {
  fs.readFile(TOKEN_PATH, (err) => {
    if (err) return false;
    return true;
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback, params) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client, params); // The callback takes a param for sending authorized request.
  }); 
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  var code = function code() {
    return authorizeApp(authUrl);
  };
  code().then((code) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.logor("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.logor(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function addFile(drive, folderId, fileName, filePath) {
  var fileMetadata = {
    'name': fileName,
    'parents': [folderId]
  };
  var media = {
    mimeType: 'application/zip',
    body: fs.createReadStream(filePath)
  };
  drive.files.create({
    requestBody: fileMetadata,
    media: media,
    fields: 'id'
  }, function (err, res) {
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, function (err) {
        if (err) {
          console.error(err);
        }
      });
    }
    if (err) {
      if (err.code === 401 || err.message === 'invalid_grant' || err.code == 403 || err.message.toLowerCase() === 'insufficient permission') {
        fs.unlink(TOKEN_PATH, function (err) {console.log(err);});
        authorize(CLIENT_SECRET, uploadFile);
        return false;
      }
      console.error(err);
    } else {
      console.log('File Id: ', res.data.id);
    }
  });
}

function createMonthFolder(drive, folderName, parentFolderId, params) {
  drive.files.create({
    resource: {
      'name': folderName,
      'mimeType': 'application/vnd.google-apps.folder',
      'parents': [parentFolderId]
    },
    fields: 'id'
  }, function (err, response) {
    if (err) {
      console.log('error:', err);
    } else {
      addFile(drive, response.id, params.fileName, params.filePathForBackup);
    }
  });
}

function uploadFile(auth, params) {
  var drive = google.drive({ version: 'v3', auth:auth });
  var isParentFolderAvailable = false;
  var isMonthFolderAvailable = false;
  var parentFolderId, monthFolderId;
  drive.files.list({
    q: "name = 'Store360 App'",
    pageSize: 1000,
    fields: 'nextPageToken, files(id, name)'
  }, function (err, res) {
    if (err) return {};
    if (res.data.files.length) {
      parentFolderId = res.data.files[0].id;
      isParentFolderAvailable = true;
    }
    if (isParentFolderAvailable) {
      var timeStamp = new Date();
      timeStamp = timeStamp.toDateString().split(' ');
      var folderName = timeStamp[1] + '-' + timeStamp[3];
      drive.files.list({
        pageSize: 1000,
        fields: 'nextPageToken, files(id, name)',
        parents: [parentFolderId]
      }, function (err, res) {
        if (err) return {};
        var files = res.data.files;
        if (files.length) {
          for (var i = 0; i < files.length; i++) {
            if (files[i].name === folderName) {
              isMonthFolderAvailable = true;
              monthFolderId = files[i].id;
              break;
            }
          }
        }
        if (isMonthFolderAvailable) {
          addFile(drive, monthFolderId, params.fileName ,params.filePathForBackup);
        } else {
          createMonthFolder(drive, folderName, parentFolderId, params);
        }
      });
    } else {
      drive.files.create({
        resource: {
          name: 'Store360 App',
          mimeType: 'application/vnd.google-apps.folder'
        },
        fields: 'id'
      }, function (err, response) {
        if (err) {
          console.log('error:', err);
        } else {
          var _timeStamp = new Date();
          _timeStamp = _timeStamp.toDateString().split(' ');
          var _folderName = _timeStamp[1] + '-' + _timeStamp[3];
          createMonthFolder(drive, _folderName, response.id, params);
        }
      });
    }
  });
}
// ------------------------------------------------------------------------------------


function authorizeApp(url) {
  return new Promise(function(resolve, reject) {
    try {
      // Changes for GAuth wrt. bug user is not able to take backup on GDrive.
      // Creating two browser window to authenticate user.
      // GAuth is not working directly with user-agent.
      // Workaround: First request is without user-agent, once we load it without user-agent then again we are trying to load it with user-agent.
      var browserWindowParams = {
        useContentSize: true,
        center: true,
        show: false,
        resizable: false,
        autoHideMenuBar: true,
        alwaysOnTop: false,
      };

      var BrowserWindow = require("electron").remote.BrowserWindow;

      var win = new BrowserWindow(
        browserWindowParams || { "use-content-size": true }
      );
      win.webContents.on("did-finish-load", function() {
        var browserWindowParams1 = {
          useContentSize: true,
          center: true,
          show: true,
          resizable: false,
          autoHideMenuBar: true,
          alwaysOnTop: true,
        };
        var win1 = new BrowserWindow(
          browserWindowParams1 || { "use-content-size": true }
        );
        win.close();
        win1.loadURL(url, { userAgent: "Chrome" });
        win1.on("closed", function() {
          reject(new Error("User closed the window"));
        });
        win1.on("page-title-updated", function() {
          (0, _setImmediate3.default)(function() {
            var title = win1.getTitle();
            if (title.startsWith("Denied")) {
              reject(new Error(title.split(/[ =]/)[2]));
              win1.removeAllListeners("closed");
              console.log(new Error("User closed the window"));
              win1.close();
            } else if (title.startsWith("Success")) {
              resolve(title.split(/[ =]/)[2]);
              win1.removeAllListeners("closed");
              win1.close();
              console.log(
                "Started Backup to Google Drive. Please continue with your work."
              );
            }
          });
        });
      });
      win.loadURL(url);
    } catch (ex) {
      reject(
        new Error("Unable to load the window. Please contact Store360 team.")
      );
    }
  });
}

export { initiateAuthentication, checkAuthentication, uploadFile };
