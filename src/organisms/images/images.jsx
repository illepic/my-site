const React = require('react');
const Card = require('../../molecules/card');
const join = require('path').join;

const Images = (props) => {
  const images = props.images.map(item => (
    <Card
      className="images__item"
      key={item.src}
      featuredImage={props.basePath ? join(props.basePath, item.src) : item.src}
    >
      <p>{item.caption}</p>
    </Card>
  ));
  return (<div className="images smart-grid" data-row-items-small="2" data-row-items-large="3">
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
