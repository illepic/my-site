const React = require('react');
const Image = require('../../atoms/image');
const util = require('../../0-base/util');
const path = require('path');

const Card = (props) => {
  let img;
  if (props.featuredImage) {
    let myPath = (
      util.isPathRootRelative(props.featuredImage) ||
      util.isPathRemote(props.featuredImage)
    ) ? props.featuredImage
      : path.join(props.path, props.featuredImage);
    img = <Image src={myPath} />;
  }
  return (
    <article className="card">
      <h5 className="card__title"><a href={props.path}>{props.title}</a></h5>
      {img}
      {props.children ? (<div className="card__contents">{props.children}</div>) : ''}
      <a href={props.path} className="button">Read More</a>
    </article>
  );
};

Card.defaultProps = {
  title: 'Default Title',
};

Card.propTypes = {
  featuredImage: React.PropTypes.string,
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  children: React.PropTypes.node,
};

module.exports = Card;
