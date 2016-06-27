'use strict';
const React = require('react');
const config = require('../../config');
const path = require('path');
const util = require('../0-base/util');

const Image = (props) => {
  let rootRelativeSrc = util.imgSrc(props.src);
  let info = path.parse(rootRelativeSrc);
  let alt = props.alt || info.name;
  return (<img 
    src={rootRelativeSrc} 
    srcSet={util.srcSet(rootRelativeSrc)}
    alt={alt}
    sizes={props.sizes}
  />);
};

module.exports = Image;
