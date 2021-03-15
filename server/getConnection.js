const { Sequelize  } = require('sequelize');
const path = require('path')

const db = new Sequelize({
        username: 'root',
        password: 'root',
        storage: path.join(process.env.APPDATA || (process.platform == 'darwin' ? process.env.HOME + '/Library/Preferences' : process.env.HOME + "/.local/share"),'/store-360/db.sqlite'),
        host: 'localhost',
        dialect: 'sqlite',
        logging: console.log
});

module.exports = db;