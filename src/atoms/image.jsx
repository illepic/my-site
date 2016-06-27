'use strict';
const React = require('react');
const config = require('../../config');
const path = require('path');
const util = require('../0-base/util');

const Image = (props) => {
  let rootRelativeSrc = util.imgSrc(props.src);
  let info = path.parse(rootRelativeSrc);
  let alt = props.alt || info.name;
  let srcSet = config.imgSizes.map(size => {
    let sizeInfo = {
      dir: info.dir,
      name: info.name + size.suffix,
      ext: info.ext
    };
    return `${path.format(sizeInfo)} ${size.width}w`;
  });
  return (<img 
    src={rootRelativeSrc} 
    srcSet={srcSet.join(', ')}
    alt={alt}
    sizes={props.sizes}
  />);
};

module.exports = Image;
