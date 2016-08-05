const React = require('react');
const Markdown = require('../../global/markdown');
const Link = require('../../atoms/link');

const Home = (props) => (<div>
  <Markdown contents={props.contents} />
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
