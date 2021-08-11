var _setImmediate2 = require("babel-runtime/core-js/set-immediate");

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const fs = require("fs").promises;
const { google } = require("googleapis");
const { BrowserWindow } = require("electron");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.file"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";
var CLIENT_SECRET_PATH = "./resource/config/credentials.json";
var CLIENT_SECRET = null;

/**
 * @param {function} callback A function need to passed as callback to execute after authentication.
 */
async function initiateAuthentication(callback, params) {
  try {
    const content = await fs.readFile(CLIENT_SECRET_PATH);
    CLIENT_SECRET = JSON.parse(content);
    const res = await authorize(CLIENT_SECRET, callback, params);
    return res;
  } catch (error) {
    return { result: false, message: error };
  }
}

function checkAuthentication() {
  let fs = require("fs");
  if (fs.existsSync(TOKEN_PATH)) {
    return true;
  }
  return false;
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
async function authorize(credentials, callback, params) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );

  // Check if we have previously stored a token.
  try {
    const token = await fs.readFile(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
    const res = await callback(oAuth2Client, params);
    return res; // The callback takes a param for sending authorized request.
  } catch (error) {
    const res = await getAccessToken(oAuth2Client, callback, params);
    return res;
  }
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
async function getAccessToken(oAuth2Client, callback, params) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  var code = function() {
    return authorizeApp(authUrl);
  };
  try {
    const access_token = await code();
    const { tokens } = await oAuth2Client.getToken(access_token);
    if (tokens === undefined) {
      throw new Error("Authentication Failed");
    } else {
      oAuth2Client.setCredentials(tokens);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(tokens), (err) => {
        if (err) return console.log(err);
        // Add a logger here
      });
      const res = await callback(oAuth2Client, params);
      return res;
    }
  } catch (error) {
    return { result: false, message: error };
  }
}

async function addFile(drive, folderId, fileName, filePath) {
  var fileMetadata = {
    name: fileName,
    parents: [folderId],
  };
  var media = {
    mimeType: "application/zip",
    body: require("fs").createReadStream(filePath),
  };
  try {
    const res = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: "id",
    });
    return { result: true, message: res.data.id};
  } catch (err) {
    if (
      err.code === 401 ||
      err.message === "invalid_grant" ||
      err.code == 403 ||
      err.message.toLowerCase() === "insufficient permission"
    ) {
      fs.unlink(TOKEN_PATH, function(err) {
        console.log(err);
      });
      const res = await authorize(CLIENT_SECRET, uploadFile);
      return res;
    }
    return { result: false, message: err };
  } finally {
    if (require("fs").existsSync(filePath)) {
      fs.unlink(filePath, function(err) {
        if (err) {
          console.log(err);
        }
      });
    }
  }
}

async function createMonthFolder(drive, folderName, parentFolderId, params) {
  try {
    const response = await drive.files.create({
      resource: {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [parentFolderId],
      },
      fields: "id",
    });
    const res = await addFile(
      drive,
      response.data.id,
      params.fileName,
      params.filePathForBackup
    );
    return res;
  } catch (error) {
    return { result: false, message: error };
  }
}

async function uploadFile(auth, params) {
  var drive = google.drive({ version: "v3", auth: auth });
  var isParentFolderAvailable = false;
  var isMonthFolderAvailable = false;
  var parentFolderId, monthFolderId;
  try {
    const res = await drive.files.list({
      q: "name = 'Store360 App'",
      pageSize: 1000,
      fields: "nextPageToken, files(id, name)",
    });
    if (res.data.files.length) {
      parentFolderId = res.data.files[0].id;
      isParentFolderAvailable = true;
    }
    if (isParentFolderAvailable) {
      var timeStamp = new Date();
      timeStamp = timeStamp.toDateString().split(" ");
      var folderName = timeStamp[1] + "-" + timeStamp[3];
      const response = await drive.files.list({
        pageSize: 1000,
        fields: "nextPageToken, files(id, name)",
        parents: [parentFolderId],
      });
      var files = response.data.files;
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
        return await addFile(
          drive,
          monthFolderId,
          params.fileName,
          params.filePathForBackup
        );
      } else {
        return await createMonthFolder(drive, folderName, parentFolderId, params);
      }
    } else {
      const response = await drive.files.create({
        resource: {
          name: "Store360 App",
          mimeType: "application/vnd.google-apps.folder",
        },
        fields: "id",
      });
      var _timeStamp = new Date();
      _timeStamp = _timeStamp.toDateString().split(" ");
      var _folderName = _timeStamp[1] + "-" + _timeStamp[3];
      return await createMonthFolder(drive, _folderName, response.data.id, params);
    }
  } catch (error) {
    return { result: false, message: error };
  }
}
// ------------------------------------------------------------------------------------

function authorizeApp(url) {
  return new Promise(function(resolve, reject) {
    try {
      var browserWindowParams = {
        useContentSize: true,
        center: true,
        show: true,
        resizable: false,
        autoHideMenuBar: true,
        alwaysOnTop: true,
      };

      var win = new BrowserWindow(
        browserWindowParams || { "use-content-size": true }
      );

      win.on("closed", function() {
        reject(new Error("User closed the window"));
      });

      win.on("page-title-updated", function() {
        (0, _setImmediate3.default)(function() {
          var title = win.getTitle();
          if (title.startsWith("Denied")) {
            reject(new Error(title.split(/[ =]/)[2]));
            win.removeAllListeners("closed");
            console.log(new Error("User closed the window"));
            win.close();
          } else if (title.startsWith("Success")) {
            resolve(title.split(/[ =]/)[2]);
            win.removeAllListeners("closed");
            win.close();
          }
        });
      });
      win.loadURL(url, { userAgent: "Chrome" });
    } catch (err) {
      reject(new Error(err));
    }
  });
}

export { initiateAuthentication, checkAuthentication, uploadFile };
