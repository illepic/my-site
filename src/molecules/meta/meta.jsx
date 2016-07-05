const React = require('react');
const Date = require('../../atoms/date');
const Tags = require('../../atoms/tags');

const Meta = (props) => (<div className="meta">
  {props.date ? <Date date={props.date} /> : null}
  {props.tags ? <Tags tags={props.tags} /> : null}
</div>);

Meta.propTypes = {
  date: React.propTypes.object,
  tags: React.propTypes.array,
};

module.exports = Meta;
