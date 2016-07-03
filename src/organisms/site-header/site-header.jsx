const React = require('react');
const SiteNav = require('../../molecules/site-nav/site-nav');
const Image = require('../../atoms/image');

const SiteHeader = (props) => {
  return (
    <header className="site__header">
      <h1 className="site-title"><a href="/">{props.site.title}</a></h1>
      <Image src={__dirname + '/logo.png'} alt="Evan Lovely Design logo" sizes="(min-width: 900px) 33vw, 100vw" />
      <SiteNav pages={props.collections.pages} />
    </header>
  );
};

module.exports = SiteHeader;
