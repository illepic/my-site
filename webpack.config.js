const config = require('./config');
const path = require('path');

module.exports = {
  entry: {
    main: [
      'whatwg-fetch',
      'react',
      'react-dom',
      path.join(process.cwd(), config.paths.src, 'global/global.js')
    ],
    styleguide: path.join(process.cwd(), config.paths.src, 'templates/styleguide/styleguide.js'),
    search: path.join(process.cwd(), config.paths.src, 'templates/search/search-client.jsx')
  },
  output: {
    filename: 'bundle--[name].js',
    path: config.paths.assets,
  },
  resolve: {
    // modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.jsx', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      filename: 'bundle--main.js'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false // https://github.com/webpack/webpack/issues/1496
      }
    })
  ]
};
