const React = require('react');
const Link = require('../../atoms/link');
const sortByWeight = require('../../0-base/util').sortByWeight;

const SiteNav = class extends React.Component {
  constructor(props) {
    super(props);
    this.isActiveSection = this.isActiveSection.bind(this);
  }

  isActiveSection(link) {
    return this.props.currentPage.split('/')[1] === link.split('/')[1];
  }

  shouldComponentUpdate(nextProps) {
    return !this.isActiveSection(nextProps.currentPage);
  }

  render() {
    let items = this.props.site.pages
    .filter(item => item.nav === 'main')
    .sort(sortByWeight)
    .map(item => (<Link
      href={item.path}
      key={item.path}
      onClick={this.props.closeNav}
      className={this.isActiveSection(item.path)
        ? 'site-nav__link site-nav__link--active'
        : 'site-nav__link'}
    >{item.title}</Link>));
    return (
      <nav className="site-nav site-header__nav">
        {items}
      </nav>
    );
  }
};

SiteNav.defaultProps = {
  currentPage: '',
};

SiteNav.propTypes = {
  pages: React.PropTypes.arrayOf(React.PropTypes.object),
  currentPage: React.PropTypes.string,
};

module.exports = SiteNav;
