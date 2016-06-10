'use strict';
const React = require('react');

const SiteNav = (props) => {
  let items = props.pages
    .filter(item => item.nav === 'main')
    .map(item => (<a href={ item.path } className="site-nav__link">{ item.title }</a>));
  return (
    <nav className="site-nav">
      {items}
    </nav>
  );
};

module.exports = SiteNav;
