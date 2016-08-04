const React = require('react');
const Link = require('../link');

const Tags = (props) => {
  const tags = props.tags.map(tag => {
    if (props.link) {
      return (<Link
        href={`/search/?tags=${tag}`}
        className="tags__tag"
        key={tag}
      >{tag}</Link>);
    }
    return <span className="tags__tag" key={tag}>{tag}</span>;
  });
  return (<span className="tags">
    {props.title ? (<h6 className="tags__title">{props.title}</h6>) : null}
    {tags}
  </span>);
};

Tags.defaultProps = {
  link: true,
};

Tags.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
  title: React.PropTypes.string,
  link: React.PropTypes.bool,
};

module.exports = Tags;
