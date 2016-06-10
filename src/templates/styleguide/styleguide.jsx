'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const Card = require('../../molecules/card/card');

const Cards = (props) => {
  return (<div>
    <h4>Cards</h4>
    <h5>Simple</h5>
    <Card {...props.dummy} excerpt={false} />
    <h5>With Excerpt</h5>
    <Card {...props.dummy} />
  </div>);
};

const Styleguide = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      <Cards {...props} />
    </Default>
  );
};

module.exports = Styleguide;
