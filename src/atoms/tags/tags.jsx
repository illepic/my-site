const React = require('react');

const Tags = (props) => {
  let tags = props.tags.map(tag => <span className="tags__tag" key={tag}>{tag}</span>);
  return (<div className="tags">{tags}</div>);
};

module.exports = Tags;
