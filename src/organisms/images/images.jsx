const React = require('react');
const Image = require('../../atoms/image');
const join = require('path').join;

const Images = (props) => {
  const images = props.images.map(item => (<figure className="images__item" key={item.src}>
    <Image src={props.basePath ? join(props.basePath, item.src) : item.src} />
    <figcaption>{item.caption}</figcaption>
  </figure>));
  return (<div className="images">
    {images}
  </div>);
};

Images.propTypes = {
  basePath: React.PropTypes.string,
  images: React.PropTypes.arrayOf(React.PropTypes.shape({
    src: React.PropTypes.string,
    caption: React.PropTypes.string,
  })),
};

module.exports = Images;
