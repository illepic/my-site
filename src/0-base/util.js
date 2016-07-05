const config = require('../../config');
const path = require('path');

function imgSrc(imgPath) {
  const relSrc = path.relative(config.paths.src, path.resolve(imgPath));
  const relDest = path.join(config.paths.assets, relSrc);
  return `/${path.relative(config.paths.dist, relDest)}`;
}

function srcSet(imgPath) {
  const info = path.parse(imgPath);
  return config.imgSizes.map(size => {
    const sizeInfo = {
      dir: info.dir,
      name: info.name + size.suffix,
      ext: info.ext,
    };
    return `${path.format(sizeInfo)} ${size.width}w`;
  }).join(', ');
}

function isPathRemote(myPath) {
  return myPath.startsWith('http');
}

function isPathRootRelative(myPath) {
  return (myPath.startsWith('/') && !myPath.startsWith('/Users'));
}

function isPathAbsolute(myPath) {
  return myPath.startsWith('/Users');
}

module.exports = {
  imgSrc,
  srcSet,
  isPathRemote,
  isPathRootRelative,
  isPathAbsolute,
};
