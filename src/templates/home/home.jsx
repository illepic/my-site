const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');
const Link = require('../../atoms/link');

const Home = (props) => (<Default {...props}>
  <Markdown contents={props.contents} />
  <p>
    <Link className="button button-primary button-lg" href="/portfolio">Portfolio</Link>
    <Link className="button button-sm" href="/contact">Contact</Link>
  </p>
</Default>
);

Home.propTypes = {
  contents: React.PropTypes.string.isRequired,
};

module.exports = Home;
