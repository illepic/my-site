'use strict';
const React = require('react');
const moment = require('moment');

const Date = (props) => (<span className="date">{moment(props.date).format('YYYY-MM-DD')}</span>);

module.exports = Date;
