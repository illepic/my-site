const React = require('react');
const Default = require('../default/default');
const Tags = require('../../atoms/tags');
const Markdown = require('../../global/markdown');
const Images = require('../../organisms/images');

const PortfolioItem = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      {props.imgs && <Images images={props.imgs} basePath={props.path} />}
      {props.features && <Tags title="Features" tags={props.features} />}
      {props.services && <Tags title="Services" tags={props.services} />}
      {props.tech && <Tags title="Tech" tags={props.tech} />}
    </Default>
  );
};
PortfolioItem.propTypes = {
  contents: React.PropTypes.string,
  features: React.PropTypes.array,
  services: React.PropTypes.array,
  tech: React.PropTypes.array,
};

module.exports = PortfolioItem;
