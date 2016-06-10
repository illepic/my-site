'use strict';
const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');

const SiteHeader = (props) => {
  return (
    <header className="site__header">
      <h1 className="site-title"><a href="/">{ props.site.title }</a></h1>
      <SiteNav pages={props.collections.pages} />
    </header>
  );
};

module.exports = SiteHeader;
