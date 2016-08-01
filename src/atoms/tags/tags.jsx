const React = require('react');

const Tags = (props) => {
  const tags = props.tags.map(tag => <span className="tags__tag" key={tag}>{tag}</span>);
  return (<span className="tags">
    {props.title ? (<h6 className="tags__title">{props.title}</h6>) : null}
    {tags}
  </span>);
};

Tags.propTypes = {
  tags: React.PropTypes.arrayOf(React.PropTypes.string),
  title: React.PropTypes.string,
};

module.exports = Tags;
