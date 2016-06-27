'use strict';
const config = require('../../config');
const path = require('path');

function imgSrc(imgPath) {
  let relSrc = path.relative(config.paths.src, imgPath);
  let relDest = path.join(config.paths.assets, relSrc);
  return `/${path.relative(config.paths.dist, relDest)}`;
}

module.exports = {
  imgSrc: imgSrc
};
