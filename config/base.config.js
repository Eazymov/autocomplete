const path = require('path');

const resolve = (str) => {
  return path.join(__dirname, '..', str);
}

module.exports = {
  output: {
    filename: 'index.min.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue'],
    alias: {
      '@': resolve('src'),
      'API': resolve('src/api'),
      'Components': resolve('src/components'),
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
        options: {
          loaders: {

          },
        },
      },
    ],
  },
}
