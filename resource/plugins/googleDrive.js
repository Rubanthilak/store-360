var _setImmediate2 = require("babel-runtime/core-js/set-immediate");

var _setImmediate3 = _interopRequireDefault(_setImmediate2);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

const fs = require("fs");
const { google } = require("googleapis");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = "token.json";

/**
* @param {function} callback A function need to passed as callback to execute after authentication.
*/
function initiateAuthentication(callback) {
  // Load client secrets from a local file.
  fs.readFile("./credentials.json", (err, content) => {
    if (err) return console.log("Error loading client secret file:", err);
    // Authorize a client with credentials, then call the Google Drive API.
    authorize(JSON.parse(content), callback);
  });
}

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
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
    callback(oAuth2Client);
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
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log("Token stored to", TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

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

export default initiateAuthentication;
