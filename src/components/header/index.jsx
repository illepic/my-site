var React = require('react');
var SiteNav = require('../site-nav');
var Header = React.createClass({
  render: function() {
    return (
      <header className="site-header">
        <a href="/" className="site-header__logo">Evan Lovely's Site </a>
        <SiteNav />
      </header>
    )
  }
});

module.exports = Header;
