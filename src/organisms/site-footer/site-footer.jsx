'use strict';
const React = require('react');

const SiteFooter = (props) => {
  let items = props.collections.pages
  .filter(item => item.nav === 'footer')
  .map(item => (<a href={ item.path } className="footer-nav__link">{ item.title }</a>));
  return (
    <footer className="site__footer">
      <nav className="footer-nav">
        {items}
      </nav>
    </footer>
  );
};

module.exports = SiteFooter;
