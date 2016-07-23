const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const LandingList = require('../../organisms/landing-list/landing-list');

const Articles = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <section>
      <LandingList items={props.site.pages.filter(page => page.section === 'articles')} />
    </section>
  </Default>
);

Articles.propTypes = {
  contents: React.PropTypes.string,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Articles;
