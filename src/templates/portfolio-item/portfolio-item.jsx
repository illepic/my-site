const React = require('react');
const Default = require('../default/default');
const Tags = require('../../atoms/tags');
const Markdown = require('../../global/markdown');

const PortfolioItem = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    {props.features && <Tags title="Features" tags={props.features} />}
    {props.services && <Tags title="Services" tags={props.services} />}
    {props.tech && <Tags title="Tech" tags={props.tech} />}
  </Default>
);

PortfolioItem.propTypes = {
  contents: React.PropTypes.object,
  features: React.PropTypes.array,
  services: React.PropTypes.array,
  tech: React.PropTypes.array,
};

module.exports = PortfolioItem;
