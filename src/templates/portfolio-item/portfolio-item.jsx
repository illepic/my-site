const React = require('react');
const Default = require('../default/default');
const Tags = require('../../atoms/tags');
const Markdown = require('../../global/markdown');
const Images = require('../../organisms/images');

const PortfolioItem = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    {props.imgs && <Images images={props.imgs} basePath={props.path} />}
    {props.features && <Tags title="Features" tags={props.features} link={false} />}
    {props.services && <Tags title="Services" tags={props.services} link={false} />}
    {props.tech && <Tags title="Tech" tags={props.tech} link={false} />}
  </Default>
);

PortfolioItem.propTypes = {
  contents: React.PropTypes.string,
  features: React.PropTypes.array,
  services: React.PropTypes.array,
  tech: React.PropTypes.array,
  imgs: React.PropTypes.array,
  path: React.PropTypes.string,
};

module.exports = PortfolioItem;
