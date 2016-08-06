/* eslint-disable react/prefer-stateless-function */
const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');
const Image = require('../../atoms/image');
const Link = require('../../atoms/link');

const SiteHeader = class extends React.Component {
  render() {
    return (
      <header className="site__header site-header">
        <div className="site-header__branding">
          <h1 className="site-header__title"><Link href="/">{this.props.site.title}</Link></h1>
          <Image
            src={'/assets/organisms/site-header/logo.png'}
            alt="Evan Lovely Design logo"
            // sizes="(min-width: 900px) 33vw, 100vw"
            className="site-header__logo"
          />
        </div>
        {/* <label htmlFor="site-nav-toggle" className="site-header__nav-toggle">Menu</label>*/}
        {/* <input type="checkbox" id="site-nav-toggle" className="site-header__nav-visible" />*/}
        <SiteNav pages={this.props.site.pages} currentPage={this.props.path} />
      </header>
    );
  }
};

SiteHeader.propTypes = {
  site: React.PropTypes.shape({
    title: React.PropTypes.string,
    pages: React.PropTypes.array,
  }),
  path: React.PropTypes.string,
};

module.exports = SiteHeader;
