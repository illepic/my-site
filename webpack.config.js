var path = require('path');
module.exports = {
  entry: path.resolve(__dirname, './src/base/default.jsx'),
  output: {
    path: path.resolve(__dirname, './public/js'),
    filename: 'bundle--default.js'
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
        loaders: [
          'style',
          'css',
          'sass'
        ]
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
  sassLoader: {
    //includePaths: [path.resolve(__dirname, './some-folder')]
  }
};