var path = require('path');

var config = {
  dir: {
    public: path.resolve(__dirname, './public'),
    assets: path.resolve(__dirname, './public/assets'),
    src: path.resolve(__dirname, './src'),
    content: path.resolve(__dirname, './source')
  }
};

module.exports = config;