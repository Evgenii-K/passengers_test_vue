const path = require('path');

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, './src/components/'),
        '@src': path.resolve(__dirname, './src/'),
        '@public': path.resolve(__dirname, './public/'),
        '@directives': path.resolve(__dirname, './src/directives/'),
        '@assets': path.resolve(__dirname, './src/assets/'),
      }
    }
  }
}