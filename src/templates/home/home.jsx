const React = require('react');
const Link = require('../../atoms/link');
const LandingList = require('../../organisms/landing-list/landing-list');

const Home = (props) => (<div>
  <p>
    <Link className="button button--lg" href="/portfolio">Portfolio</Link>
    <Link className="button" href="/contact">Contact</Link>
  </p>
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
};

module.exports = Home;
