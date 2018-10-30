const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('./config');
const { resolve } = require('./utils');
module.exports = {
  entry: {
    app: [
      'react-hot-loader/patch',
      './src/index.jsx'
    ],
  },
  output: {
    path: resolve(config.prod.outputPath),
  },
  resolve: {
    extensions: ['.js', '.jsx',],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          // 'react-hot-loader/webpack',
          'babel-loader'
        ],
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            limit: 10000,
            outputPath: 'static/images/'
          }
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2|otf)/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[hash:8].[ext]',
            limit: 10000,
            outputPath: 'static/fonts/'
          }
        }
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: resolve('static'),
      to: resolve(config.prod.outputPath, 'static'),
      ignore: ['.*'],
    }]),
  ],
};