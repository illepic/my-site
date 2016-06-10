'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');

const Styleguide = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      
    </Default>
  );
};

module.exports = Styleguide;
