module.exports = {
  publicPath: './',
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {
        data: '@import "~@/assets/css/common/_var.scss";',
      },
    },
  },
  devServer: {
    disableHostCheck: true,
    port: 80,
  },
  productionSourceMap: false,
};
