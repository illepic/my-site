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
  const title = [props.site.title];
  if (props.section) title.unshift(capitalizeFirstLetter(props.section));
  if (props.title && props.title !== title[0]) title.unshift(props.title);
  return title.join(' | ');
}

function sortByCount(a, b) {
  if (a.count < b.count) return 1;
  if (a.count > b.count) return -1;
  return 0;
}

function sortByName(a, b) {
  const nameA = a.name.toUpperCase(); // ignore upper and lowercase
  const nameB = b.name.toUpperCase();
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
}

function sortByWeight(a, b) {
  if (a.weight > b.weight) return 1;
  if (a.weight < b.weight) return -1;
  return 0;
}

function sortByDate(a, b) {
  return new Date(b.date) - new Date(a.date);
}

function flattenArray(arr) {
  return [].concat(...arr);
}

function getTags(pages, options = {}) {
  const opt = Object.assign({
    sortBy: 'frequency',
  }, options);
  const tags = [];
  flattenArray(pages.map(item => item.tags)).forEach(tag => {
    let i = 0;

    const isAlreadyAdded = tags.some((item, index) => {
      i = index;
      return item.name === tag;
    });

    if (isAlreadyAdded) {
      tags[i].count++;
    } else {
      tags.push({
        name: tag,
        count: 1,
      });
    }
  });
  if (opt.sortBy === 'frequency') {
    return tags.sort(sortByCount);
  }
  if (opt.sortBy === 'name') {
    return tags.sort(sortByName);
  }
  return tags;
}

module.exports = {
  imgSrc,
  srcSet,
  isPathRemote,
  isPathRootRelative,
  isPathAbsolute,
  docTitle,
  sortByWeight,
  sortByDate,
  getTags,
};
