const React = require('react');
const Date = require('../../atoms/date');
const Tags = require('../../atoms/tags');

const Meta = (props) => {
  return (<div className="meta">
    {props.date ? <Date date={props.date} /> : null}
    {props.tags ? <Tags tags={props.tags} /> : null}
  </div>);
};

module.exports = Meta;
