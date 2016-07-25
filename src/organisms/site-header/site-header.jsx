const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');
const Image = require('../../atoms/image');

const SiteHeader = (props) => (
  <header className="site__header site-header">
    <div className="site-header__branding">
      <h1 className="site-header__title"><a href="/">{props.site.title}</a></h1>
      <Image
        src={`${__dirname}/logo.png`}
        alt="Evan Lovely Design logo"
        // sizes="(min-width: 900px) 33vw, 100vw"
        className="site-header__logo"
      />
    </div>
    <label htmlFor="site-nav-toggle" className="site-header__nav-toggle">Menu</label>
    <input type="checkbox" id="site-nav-toggle" className="site-header__nav-visible hidden" />
    <SiteNav pages={props.site.pages} />
  </header>
);

SiteHeader.propTypes = {
  collections: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
  site: React.PropTypes.shape({
    title: React.PropTypes.string,
    pages: React.PropTypes.array,
  }),
};

module.exports = SiteHeader;
