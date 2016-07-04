const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');

const Home = (props) => (
  <Default {...props}>
    <Markdown contents={props.contents} />
    <p>
      <a className="btn btn-primary btn-large" href="/portfolio">Portfolio</a>
      <a className="btn btn-large" href="/contact">Contact</a>
    </p>

  </Default>
);

Home.propTypes = {
  contents: React.PropTypes.object.isRequired,
};

module.exports = Home;
