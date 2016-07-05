const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Portfolio = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.collections.portfolios} />

    </section>
  </Default>
);

Portfolio.propTypes = {
  contents: React.PropTypes.object,
  collections: React.PropTypes.shape({
    portfolios: React.PropTypes.array,
  }),
};

module.exports = Portfolio;
