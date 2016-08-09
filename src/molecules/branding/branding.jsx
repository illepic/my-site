const React = require('react');
const Image = require('../../atoms/image');
const Link = require('../../atoms/link');

const Branding = (props) => (<div className="branding">
  <h1 className="branding__title"><Link href="/">{props.site.title}</Link></h1>
  <Image
    src={'/assets/molecules/branding/logo.png'}
    alt="Evan Lovely Design logo"
    // sizes="(min-width: 900px) 33vw, 100vw"
    className="branding__logo"
  />
</div>);

Branding.propTypes = {
  site: React.PropTypes.shape({
    title: React.PropTypes.string,
  }),
};

module.exports = Branding;
