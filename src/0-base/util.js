'use strict';
const config = require('../../config');
const path = require('path');

module.exports = {
  imgSrc: function(baseDir, imgFilename) {
    let absSrc = path.join(baseDir, imgFilename);
    let relSrc = path.relative(config.paths.src, absSrc);
    let relDest = path.join(config.paths.assets, relSrc);
    let rootRelativeSrc = `/${path.relative(config.paths.dist, relDest)}`;
    return rootRelativeSrc;
  }
};
