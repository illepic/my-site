const React = require('react');
const Link = require('../../atoms/link');

const SiteNav = (props) => {
  let items = props.pages
    .filter(item => item.nav === 'main')
    .sort((a, b) => a.weight > b.weight)
    .map(item => (<Link
      href={item.path}
      key={item.path}
      className="site-nav__link"
    >{item.title}</Link>));
  return (
    <nav className="site-nav site-header__nav">
      {items}
    </nav>
  );
};

SiteNav.propTypes = {
  pages: React.PropTypes.arrayOf(React.PropTypes.object),
};

module.exports = SiteNav;
