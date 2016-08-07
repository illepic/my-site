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
    let toc;
    if (!this.props.hideToc && this.props.toc.length !== 0) {
      const tocItems = this.props.toc.map(item => <li
        key={item.id}
        className={`toc__item toc__item--${item.tagName}`}
      >
        <a href={`#${item.id}`}>{item.title}</a>
      </li>);
      toc = (<div className="site-header__toc toc small">
        <h6>Table of Contents</h6>
        <ul className="toc__items">{tocItems}</ul>
      </div>);
    }
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
        {toc}
      </header>
    );
  }
};

SiteHeader.propTypes = {
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
  path: React.PropTypes.string,
  toc: React.PropTypes.arrayOf(React.PropTypes.shape({
    id: React.PropTypes.string,
    title: React.PropTypes.string,
    tagName: React.PropTypes.string,
  })),
  hideToc: React.PropTypes.bool,
};

module.exports = SiteHeader;
