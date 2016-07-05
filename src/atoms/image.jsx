const React = require('react');
const path = require('path');
const util = require('../0-base/util');

const Image = (props) => {
  const isRemotePath = util.isPathRemote(props.src);
  const isRootRelativePath = util.isPathRootRelative(props.src);
  const src = ((isRemotePath || isRootRelativePath) ? props.src : util.imgSrc(props.src));
  const info = path.parse(src);
  const alt = props.alt || info.name;
  return (<img
    src={src}
    srcSet={isRemotePath ? null : util.srcSet(src)}
    alt={alt}
    sizes={props.sizes}
  />);
};

Image.propTypes = {
  src: React.propTypes.string,
  alt: React.propTypes.string,
  sizes: React.propTypes.string,
};

module.exports = Image;
