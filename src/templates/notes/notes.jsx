'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Notes = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      <section>
        <LandingList items={props.collections.notes} />

      </section>      
    </Default>
  );
};

module.exports = Notes;
