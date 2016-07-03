'use strict';
const React = require('react');
const moment = require('moment');

const Date = (props) => {
  let date = (typeof props.date === 'string') ? moment(props.date, 'YYYY-MM-DD') : props.date;
  return (<span className="date">
    <span className="date__month">{moment(date).format('MMM')}</span>
    <span className="date__year">{moment(date).format('YYYY')}</span>
    <span className="date__day">{moment(date).format('D')}</span>
  </span>);
};

module.exports = Date;
