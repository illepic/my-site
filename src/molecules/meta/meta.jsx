const React = require('react');
const Date = require('../../atoms/date');
const Tags = require('../../atoms/tags');

const Meta = (props) => {
  if (!props.dateStrings && !props.tags && !props.draft) return null;
  return (
    <div className={`meta ${props.className || ''}`}>
      {props.dateStrings ? <Date dateStrings={props.dateStrings} /> : null}
      {props.tags ? <Tags tags={props.tags} /> : null}
      {props.draft ? <span>Draft</span> : null}
    </div>
  );
};

Meta.propTypes = {
  dateStrings: React.PropTypes.shape({
    month: React.PropTypes.string,
    day: React.PropTypes.string,
    year: React.PropTypes.string,
  }),
  tags: React.PropTypes.array,
  className: React.PropTypes.string,
  draft: React.PropTypes.bool,
};

module.exports = Meta;
