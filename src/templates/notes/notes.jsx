const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Notes = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.collections.notes} />
    </section>
  </Default>
);

Notes.propTypes = {
  contents: React.PropTypes.object,
  collections: React.PropTypes.shape({
    notes: React.PropTypes.array,
  }),
};

module.exports = Notes;
