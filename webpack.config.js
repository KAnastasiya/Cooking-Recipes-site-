'use strict';

let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: path.join(__dirname, '/src'),

  entry: {
    index: './scripts/internals/index',
    contacts: './scripts/internals/contacts',
    'sign-up': './scripts/internals/sign-up',
    common: './scripts/internals/common',
    styles: './styles/styles'
  },

  output: {
    path: path.join(__dirname, 'sources'),
    filename: '[name].js',
    publicPath: '/'
  },

  devtool: 'cheap-inline-module-source-map',

  resolve: {
    modulesDirectories: ['node_modules', './src'],
    extensions: ['', '.js', '.css', '.less']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: { presets: ['es2015'] }
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer?browsers=last 2 versions'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('css?sourceMap!' + 'less?sourceMap')
      },
      {
        test: /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
        loader: 'url?name=[path][name].[ext]&limit=4096'
      }
    ],
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: path.resolve(__dirname, '/src/scripts/internals')
      }
    ]
  },

  eslint: {
    configFile: '/.eslintrc'
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: 2
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new ExtractTextPlugin('styles.css', {allChunks: true}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      }
    })
  ]
};
