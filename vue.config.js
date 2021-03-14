module.exports = {
  chainWebpack: config => {
    config
        .plugin('html')
        .tap(args => {
            args[0].title = "Store 360";
            return args;
        })
    },
    css: {
      loaderOptions: {
        sass: {
          additionalData: `@import "@/style/_const.scss";`,
        },
      },
    },
  };