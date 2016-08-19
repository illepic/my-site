const React = require('react');

const Date = (props) => {
  const month = <span className="date__month">{props.dateStrings.month}</span>;
  const day = <span className="date__day">{props.dateStrings.day}</span>;
  const year = <span className="date__year">{props.dateStrings.year}</span>;
  return <span className="date">{month} {day}, {year}</span>;
};

Date.propTypes = {
  dateStrings: React.PropTypes.shape({
    month: React.PropTypes.string,
    day: React.PropTypes.string,
    year: React.PropTypes.string,
  }),
};

module.exports = Date;
