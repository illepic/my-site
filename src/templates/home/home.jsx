const React = require('react');
const Link = require('../../atoms/link');

const Home = (props) => (<div>
  <p>
    <Link className="button button-primary button-lg" href="/portfolio">Portfolio</Link>
    <Link className="button button-sm" href="/contact">Contact</Link>
  </p>
</div>
);

Home.propTypes = {
  contents: React.PropTypes.string.isRequired,
};

module.exports = Home;
