const React = require('react');
const Card = require('../card');
const Meta = require('../meta');
const Link = require('../../atoms/link');

const LinksCard = (props) => {
  const relatedList = props.links.map(page => <li key={page.path}>
    <Link href={page.path}>{page.title}</Link>
    {props.showSection ? <span className="card__section small"> ({page.section})</span> : null}
    <Meta {...page} />
  </li>);
  return (<Card {...props} className={`card--links ${props.className}`}>
    <ul>{relatedList}</ul>
  </Card>);
};

LinksCard.propTypes = {
  links: React.PropTypes.arrayOf(React.PropTypes.shape({
    path: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
  })).isRequired,
  className: React.PropTypes.string,
  showSection: React.PropTypes.bool,
};

module.exports = LinksCard;
