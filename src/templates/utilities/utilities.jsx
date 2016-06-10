'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Utilities = (props) => {
  return (
    <Default {...props}>
      <h3>Utilities Layout</h3>
      <Markdown contents={props.contents} />
      <section>
        <LandingList items={props.collections.utilities} />

      </section>      
    </Default>
  );
};

module.exports = Utilities;
