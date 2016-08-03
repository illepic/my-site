const React = require('react');
const Card = require('../card');
const Meta = require('../meta');
const Link = require('../../atoms/link');

const LinksCard = (props) => {
  const relatedList = props.links.map(page => <li key={page.path}>
    <Link href={page.path}>{page.title}</Link>
    <span className="small"> {page.section}</span>
    <Meta {...page} />
  </li>);
  return (<Card {...props} className={`card--links ${props.className}`}>
    <ul>{relatedList}</ul>
  </Card>);
};

LinksCard.propTypes = {
  links: React.PropTypes.array,
  className: React.PropTypes.string,
};

module.exports = LinksCard;
