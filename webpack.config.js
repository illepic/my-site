'use strict';
const webpack = require('webpack');
const config = require('./config');
const path = require('path');

module.exports = {
  entry: {
    main: path.join(process.cwd(), config.paths.src, 'global/global.js'),
    styleguide: path.join(process.cwd(), config.paths.src, 'templates/styleguide/styleguide.js')
  },
  output: {
    filename: 'bundle--[name].js',
    path: config.paths.assets
  },
  module: {
    loaders: [
      
    ]
  }
};
