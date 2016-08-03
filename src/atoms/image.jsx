const React = require('react');
const parse = require('path-parse');
const util = require('../0-base/util');

const Image = (props) => {
  const isRemotePath = util.isPathRemote(props.src);
  const isRootRelativePath = util.isPathRootRelative(props.src);
  const src = ((isRemotePath || isRootRelativePath) ? props.src : util.imgSrc(props.src));
  const info = parse(src);
  const alt = props.alt || info.name;
  let srcSet = null;
  let sizes = null;
  if (process.env.NODE_ENV === 'production') {
    if (!isRemotePath) {
      srcSet = util.srcSet(src);
    }
    sizes = props.sizes;
  }
  return (<img
    src={src}
    srcSet={srcSet}
    alt={alt}
    sizes={sizes}
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
