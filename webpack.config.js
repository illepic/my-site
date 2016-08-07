const config = require('./config');
const path = require('path');
const webpack = require('webpack');

const options = {
  entry: {
    main: [
      'whatwg-fetch',
      'react',
      'react-dom',
      path.join(process.cwd(), config.paths.src, 'global/global.js'),
      path.join(process.cwd(), config.paths.src, 'client.jsx'),
    ],
    // styleguide: path.join(process.cwd(), config.paths.src, 'templates/styleguide/styleguide.js'),
  },
  output: {
    filename: 'bundle--[name].js',
    path: config.paths.assets,
  },
  resolve: {
    modulesDirectories: ['node_modules', 'src'],
    extensions: ['', '.jsx', '.js'],
  },
  module: {
    loaders: [
      {
        test: /\.js/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      filename: 'bundle--main.js',
    }),
  ],
};

if (process.env.NODE_ENV === 'production') {
  options.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }));

  options.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false, // https://github.com/webpack/webpack/issues/1496
    },
  }));
}

module.exports = options;
