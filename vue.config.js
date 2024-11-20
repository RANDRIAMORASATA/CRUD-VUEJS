const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  publicPath: '/app/',
  lintOnSave: false,
  devServer: {
    proxy: {
      '/users': {
        target: 'https://jsonplaceholder.typicode.com',
        changeOrigin: true,
        secure: false, 
        pathRewrite: {
          '^/users': '/users',  
        },
      },
    },
  },
});

