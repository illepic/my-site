const React = require('react');

const SiteFooter = (props) => {
  const items = props.collections.pages
  .filter(item => item.nav === 'footer')
  .map(item => (<a href={item.path} key={item.path} className="footer-nav__link">{item.title}</a>));
  return (
    <footer className="site__footer">
      <nav className="footer-nav">
        {items}
      </nav>
    </footer>
  );
};

SiteFooter.propTypes = {
  collections: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = SiteFooter;
