const React = require('react');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Notes = (props) => (
  <div>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.site.pages.filter(page => page.section === 'notes')} />
    </section>
  </div>
);

Notes.propTypes = {
  contents: React.PropTypes.string,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Notes;
