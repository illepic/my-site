'use strict';
const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Articles = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      <section>
        <LandingList items={props.collections.articles} />
      </section>      
    </Default>
  );
};

module.exports = Articles;
