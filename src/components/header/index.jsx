var base = require('../../base');
var React = require('react');
var SiteNav = require('../site-nav');
var logo = base.assetPath(__dirname, 'logo.png');

var Header = React.createClass({
  render: function() {
    return (
      <header className="site-header">
        <a href="/" className="site-header__logo">
          <img src={logo} alt="Evan Lovely" />
        </a>
        <SiteNav />
      </header>
    )
  }
});

module.exports = Header;
 