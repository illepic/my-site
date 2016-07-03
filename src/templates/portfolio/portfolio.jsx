'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Portfolio = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      <section>
        <LandingList items={props.collections.portfolios} />

      </section>
    </Default>
  );
};

module.exports = Portfolio;
