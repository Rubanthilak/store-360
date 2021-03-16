const path = require('path');

var filePath = {
    DATABASE_FILEPATH_LOCATION: path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share"),'/store-360/db.sqlite'),
    DEV_DATABASE_FILEPATH_LOCATION: path.join(__dirname,'../db.sqlite')
}

module.exports = filePath;