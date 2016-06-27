'use strict';
const config = require('../../config');
const path = require('path');

function imgSrc(imgPath) {
  let relSrc = path.relative(config.paths.src, imgPath);
  let relDest = path.join(config.paths.assets, relSrc);
  return `/${path.relative(config.paths.dist, relDest)}`;
}

function srcSet(imgPath) {
  let info = path.parse(imgPath);
  return config.imgSizes.map(size => {
    let sizeInfo = {
      dir: info.dir,
      name: info.name + size.suffix,
      ext: info.ext
    };
    return `${path.format(sizeInfo)} ${size.width}w`;
  }).join(', ');
}

module.exports = {
  imgSrc: imgSrc,
  srcSet: srcSet
};
