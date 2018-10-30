const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const common = require('./webpack.common');
const config = require('./config');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    publicPath: config.dev.publicPath,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      ...config.common.htmlConfig,
    }),
    new StyleLintPlugin({
      emitErrors: false
    }),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          },
        },
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      }, {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devtool: config.dev.devtool,
  devServer: {
    contentBase: false,
    hot: true,
    port: config.dev.port,
    proxy: config.dev.proxy,
  },
});
