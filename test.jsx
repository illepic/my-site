"use strict";
const React = require('react');

const Test = (props) => {
  return (<div>
    <h3>Hello {props.title}!</h3>
    <h5>{props.subtitle}</h5>
  </div>);
};

Test.defaultProps = {
  subtitle: 'default subtitle'
};

module.exports = Test;
