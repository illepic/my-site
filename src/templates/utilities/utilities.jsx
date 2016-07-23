const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Utilities = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.site.pages.filter(page => page.section === 'utilities')} />
    </section>
  </Default>
);

Utilities.propTypes = {
  contents: React.PropTypes.string,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Utilities;
