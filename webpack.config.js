var webpack = require('webpack');
var path = require('path');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

module.exports = {
  entry: {
    post: path.resolve(__dirname, './src/templates/post-loader.jsx'),
    vendor: ['react']
  },
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/assets/',
    filename: 'bundle--[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: [
          /\.jsx$/
          ///\.js$/
        ],
        loader: 'babel',
        //exclude: /(node_modules|bower_components)/,
        exclude: [node_modules_dir],
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ],
    noParse: [/\.scss$/]
  },
  externals: {
    //'react': 'React'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]
};