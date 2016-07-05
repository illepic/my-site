const React = require('react');
const Image = require('../../atoms/image');
const join = require('path').join;

const Images = (props) => {
  const images = props.images.map(item => {
    if (typeof item === 'string') {
      const imagePath = props.basePath ? join(props.basePath, item) : item;
      return (<figure className="images__item" key={imagePath}>
        <Image src={imagePath} />
      </figure>);
    } else if (typeof item === 'object') {
      const imagePath = props.basePath ? join(props.basePath, item.src) : item.src;
      return (<figure className="images__item" key={imagePath}>
        <Image src={imagePath} />
        <figcaption>{item.caption}</figcaption>
      </figure>);
    }
    return null;
  });
  return (<div className="images">
    {images}
  </div>);
};

Images.propTypes = {
  basePath: React.PropTypes.string,
  images: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.shape({
      src: React.PropTypes.string,
      caption: React.PropTypes.string,
    }),
  ]),
};

module.exports = Images;
