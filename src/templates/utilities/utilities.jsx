const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Utilities = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.collections.utilities} />
    </section>
  </Default>
);

Utilities.propTypes = {
  contents: React.PropTypes.object,
  collections: React.PropTypes.shape({
    utilities: React.PropTypes.array,
  }),
};

module.exports = Utilities;
