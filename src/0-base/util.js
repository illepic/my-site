const config = require('../../config');
const path = require('path');

function imgSrc(imgPath) {
  const relSrc = path.relative(config.paths.src, path.resolve(imgPath));
  const relDest = path.join(config.paths.assets, relSrc);
  return `/${path.relative(config.paths.dist, relDest)}`;
}

function srcSet(imgPath) {
  // doing this way instead of using `path.parse` b/c webpack has hard time w/it
  const pathArray = imgPath.split('/');
  const file = pathArray.pop();
  const dir = pathArray.join('/');
  const fileInfoArray = file.split('.');
  const fileName = fileInfoArray[0];
  const fileExt = fileInfoArray[1];
  return config.imgSizes.map(size => {
    const filePath = `${dir}/${fileName}${size.suffix}.${fileExt}`;
    return `${filePath} ${size.width}w`;
  }).join(', ');
}

function isPathRemote(myPath) {
  return myPath.startsWith('http') || myPath.startsWith('//');
}

function isPathRootRelative(myPath) {
  return (myPath.startsWith('/') && !myPath.startsWith('//') && !myPath.startsWith('/Users'));
}

function isPathAbsolute(myPath) {
  return myPath.startsWith('/Users');
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function docTitle(props) {
  let title = [props.site.title];
  if (props.section) title.unshift(capitalizeFirstLetter(props.section));
  if (props.title && props.title !== title[0]) title.unshift(props.title);
  return title.join(' | ');
}

module.exports = {
  imgSrc,
  srcSet,
  isPathRemote,
  isPathRootRelative,
  isPathAbsolute,
  docTitle,
};
