module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    externals: {
      sequelize: "require('sequelize')",
    },
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
    },
  }
};
