const React = require('react');
const LandingList = require('../../organisms/landing-list/landing-list');

const Home = (props) => (<div>
  <LandingList
    items={props.site.pages
      .filter(page => page.section === 'blog' && !page.landingPage)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 6)
    }
    showExcerpts={false}
  />
</div>
);

Home.propTypes = {
  contents: React.PropTypes.string.isRequired,
  site: React.PropTypes.shape({
    pages: React.PropTypes.array,
  }),
};

module.exports = Home;
