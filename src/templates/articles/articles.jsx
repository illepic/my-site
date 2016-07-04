const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Articles = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.collections.articles} />
    </section>
  </Default>
);

Articles.propTypes = {
  contents: React.PropTypes.object,
  collections: React.PropTypes.shape({
    articles: React.PropTypes.array,
  }),
};

module.exports = Articles;
