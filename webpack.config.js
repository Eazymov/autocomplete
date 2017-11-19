require('dotenv').config();

const path = require('path');
const resolve = (str) => {
  return path.join(__dirname, str);
}
const config = {
  entry: './src/main.ts',
  output: {
    filename: 'index.min.js',
    path: resolve('dist'),
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue'],
    alias: {
      '@': resolve('src'),
      'API': resolve('src/api'),
      'Components': resolve('src/components'),
      'TestHelpers': resolve('test/helpers'),
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [
            /\.vue$/,
          ],
        },
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }, {
        test: /\.pug$/,
        loader: 'pug-html-loader',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.sass$/,
        loader: 'style-loader!css-loader!sass-loader',
        exclude: /node_modules/,
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
    ],
  },
}

switch (process.env.NODE_ENV) {

  case 'development':
    config.devServer = {
      port: 8080,
      contentBase: './',
    };

    break;

  case 'production':
    break;

  default:
    break;
}

module.exports = config
