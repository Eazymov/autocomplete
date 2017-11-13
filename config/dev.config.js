const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  entry: './src/main.ts',
  devServer: {
    port: 8080,
    contentBase: './',
  },
});
