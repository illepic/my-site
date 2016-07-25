const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');

const Home = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <p>
      <a className="button button-primary button-lg" href="/portfolio">Portfolio</a>
      <a className="button button-sm" href="/contact">Contact</a>
    </p>

  </Default>
);

Home.propTypes = {
  contents: React.PropTypes.string.isRequired,
};

module.exports = Home;
