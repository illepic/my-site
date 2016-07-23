const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Portfolio = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.site.pages.filter(page => page.section === 'portfolio')} />
    </section>
  </Default>
);

Portfolio.propTypes = {
  contents: React.PropTypes.string,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Portfolio;
