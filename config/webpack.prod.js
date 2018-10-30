const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const common = require('./webpack.common');
const config = require('./config');
const { resolve } = require('./utils');

module.exports = merge(common, {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    publicPath: config.prod.publicPath,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              localIdentName: '[hash:base64:5]',
              modules: true
            }
          },
          'postcss-loader',
          'sass-loader',
        ],
      }
    ],
  },
  devtool: config.prod.devtool,
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'common',
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new CleanWebpackPlugin([config.prod.outputPath], {
      root: resolve()
    }),
    new HtmlWebpackPlugin({
      ...config.common.htmlConfig,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[chunkhash:8].css',
      chunkFilename: 'static/css/[id].[chunkhash:8].css'
    }),
  ],
});
