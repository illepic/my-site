const React = require('react');
const moment = require('moment');

const Date = (props) => {
  const date = (typeof props.date === 'string') ? moment(props.date, 'YYYY-MM-DD') : props.date;
  const month = <span className="date__month">{moment(date).format('MMM')}</span>;
  const day = <span className="date__day">{moment(date).format('D')}</span>;
  const year = <span className="date__year">{moment(date).format('YYYY')}</span>;
  return <span className="date">{month} {day}, {year}</span>;
};

Date.propTypes = {
  date: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.object,
  ]),
};

module.exports = Date;
