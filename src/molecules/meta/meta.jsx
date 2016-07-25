const React = require('react');
const Date = require('../../atoms/date');
const Tags = require('../../atoms/tags');

const Meta = (props) => (<div className={`meta ${props.className || ''}`}>
  {props.date ? <Date date={props.date} /> : null}
  {props.tags ? <Tags tags={props.tags} /> : null}
  {props.draft ? <span>Draft</span> : null}
</div>);

Meta.propTypes = {
  date: React.PropTypes.string,
  tags: React.PropTypes.array,
  className: React.PropTypes.string,
  draft: React.PropTypes.bool,
};

module.exports = Meta;
