const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');
const Branding = require('../../molecules/branding');

const SiteHeader = class extends React.Component {
  // When an item in the nav is clicked, we want to close it
  closeNav() {
    const toggle = document.getElementById('site-nav-toggle');
    if (toggle.checked) toggle.checked = false;
  }

  render() {
    let toc;
    if (!this.props.hideToc && this.props.toc && this.props.toc.length !== 0) {
      const tocItems = this.props.toc.map(item => <li
        key={item.id}
        className={`toc__item toc__item--${item.tagName}`}
      >
        <a
          href={`#${item.id}`}
          onClick={this.closeNav}
        >{item.title}</a>
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
    if (toc) classList.push('site__header--has-toc');
    return (
      <header className={classList.join(' ')}>
        <Branding {...this.props} />
        <SiteNav
          {...this.props}
          currentPage={this.props.path}
          closeNav={this.closeNav}
        />
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
