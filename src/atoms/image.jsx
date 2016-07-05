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
    className={props.className}
  />);
};

Image.propTypes = {
  src: React.PropTypes.string,
  alt: React.PropTypes.string,
  sizes: React.PropTypes.string,
  className: React.PropTypes.string,
};

module.exports = Image;
