'use strict';
const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');
const imgSrc = require('../../0-base/util').imgSrc;
const logoSrc = imgSrc(__dirname, './logo.png');

const SiteHeader = (props) => {
  return (
    <header className="site__header">
      <h1 className="site-title"><a href="/">{ props.site.title }</a></h1>
      <img src={logoSrc} alt="Evan Lovely Design logo" />
      <SiteNav pages={props.collections.pages} />
    </header>
  );
};

module.exports = SiteHeader;
