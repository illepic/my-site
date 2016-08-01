const React = require('react');
const Card = require('../card');
const Meta = require('../meta');

const LinksCard = (props) => {
  const relatedList = props.links.map(page => <li key={page.path}>
    <a href={page.path}>{page.title}</a>
    <span className="small"> {page.section}</span>
    <Meta {...page} />
  </li>);
  return (<Card {...props} className={`card--links ${props.className}`}>
    <ul>{relatedList}</ul>
  </Card>);
};

LinksCard.propTypes = {
  links: React.PropTypes.array,
};

module.exports = LinksCard;
