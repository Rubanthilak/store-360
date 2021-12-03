const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = {
  configureWebpack: {
    target: "electron-renderer",
    devtool: 'source-map',
    externals: {
      sequelize: "require('sequelize')",
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: path.join(__dirname, 'static'),
        to: path.join(__dirname, 'public'),
        toType: "dir",
      }])
    ]
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Store 360";
      return args;
    });
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/style/_const.scss";`,
      },
    },
  },
  pluginOptions: {
    electronBuilder: {
      externals: ["sequelize"],
      nodeIntegration: true,
      builderOptions: {
        extraResources: ["db.sqlite"],
      },
      win: {
        target: [
          {
            target: 'nsis',
            arch: ['ia32']
          }
        ]
      }
    },
  },
};
