const React = require('react');
const config = require('../../config');
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
  if (config.feat.srcset) {
    if (!isRemotePath) {
      srcSet = util.srcSet(src);
    }
    sizes = props.sizes || '(min-width: 1200px) 33vw, (min-width: 800px) 50vw, 100vw';
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
