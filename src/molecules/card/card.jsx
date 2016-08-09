const React = require('react');
const Image = require('../../atoms/image');
const util = require('../../0-base/util');
const path = require('path');
const Link = require('../../atoms/link');

const Card = (props) => {
  let img;
  const fallbackImage = (props.imgs) ? props.imgs[0].src : null;
  const imgFilename = props.featuredImage || fallbackImage;
  if (imgFilename) {
    const myPath = (
      util.isPathRootRelative(imgFilename) ||
      util.isPathRemote(imgFilename)
    ) ? imgFilename
      : path.join(props.path, imgFilename);
    img = <Image src={myPath} className="card__image" />;
  }
  let title = '';
  if (props.title) {
    if (props.path || props.title_url) {
      title = (<Link href={(props.title_url ? props.title_url : props.path)}>
        {props.title} {(props.title_url ? '=>' : null)}
      </Link>);
    } else {
      title = props.title;
    }
  }
  const classList = ['card'];
  if (props.className) classList.push(props.className);
  return (
    <article className={classList.join(' ')}>
      {title ? (<h5 className="card__title">{title}</h5>) : null}
      {img}
      {props.children ? (<div className="card__contents">{props.children}</div>) : ''}
      {props.title_url && props.path ? (<Link href={props.path} className="button">Read More</Link>) : null}
    </article>
  );
};

Card.propTypes = {
  featuredImage: React.PropTypes.string,
  path: React.PropTypes.string,
  title: React.PropTypes.string,
  title_url: React.PropTypes.string,
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  imgs: React.PropTypes.arrayOf(React.PropTypes.shape({
    src: React.PropTypes.string,
    caption: React.PropTypes.string,
  })),
  draft: React.PropTypes.bool,
};

module.exports = Card;
