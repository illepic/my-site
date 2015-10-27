var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    default: path.resolve(__dirname, './src/base/default.jsx')
  },
  output: {
    path: path.resolve(__dirname, './public/assets'),
    publicPath: '/assets/',
    filename: 'bundle--[name].js',
    chunkFilename: 'chunk-[id].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!sass') 
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        //exclude: /(node_modules|bower_components)/,
        query: {
          optional: ['runtime'],
          stage: 0
        }
      }
    ]
  },
  externals: {
    //'react': 'React'
  },
  plugins: [
    new ExtractTextPlugin("style--[name].css")
  ],
  sassLoader: {
    //includePaths: [path.resolve(__dirname, './some-folder')]
  }
};