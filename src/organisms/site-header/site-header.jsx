/* eslint-disable react/prefer-stateless-function */
const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');
const Branding = require('../../molecules/branding');

const SiteHeader = class extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      open: true,
    };
  }

  componentWillMount() {
    this.setState({
      open: false,
    });
  }

  componentWillReceiveProps() {
    this.setState({
      open: false,
    });
  }

  toggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  render() {
    const classList = [
      'site__header',
      'site-header',
    ];
    if (this.state.open) classList.push('site__header--open');
    return (
      <header className={classList.join(' ')}>
        <Branding {...this.props} />
        {/* <button className="site-header__nav-toggle" onClick={this.toggle}>Menu</button>*/}
        {/* <label htmlFor="site-nav-toggle" className="site-header__nav-toggle">Menu</label>*/}
        {/* <input type="checkbox" id="site-nav-toggle" className="site-header__nav-visible" />*/}
        <SiteNav pages={this.props.site.pages} currentPage={this.props.path} />
      </header>
    );
  }
};

SiteHeader.propTypes = {
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
  path: React.PropTypes.string,
};

module.exports = SiteHeader;
