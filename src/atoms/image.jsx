'use strict';
const React = require('react');
const config = require('../../config');
const path = require('path');
const util = require('../0-base/util');

const Image = (props) => {
  let isRemotePath = util.isPathRemote(props.src);
  let isRootRelativePath = util.isPathRootRelative(props.src);
  let src = ((isRemotePath || isRootRelativePath) ? props.src : util.imgSrc(props.src));
  let info = path.parse(src);
  let alt = props.alt || info.name;
  return (<img
    src={src}
    srcSet={isRemotePath ? null : util.srcSet(src)}
    alt={alt}
    sizes={props.sizes}
  />);
};

module.exports = Image;
