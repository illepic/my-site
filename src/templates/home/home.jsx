const React = require('react');
const Default = require('../default/default');
const Markdown = require('../../global/markdown');

const Home = (props) => {
  return (
    <Default {...props}>
      <Markdown contents={props.contents} />
      <p><a className="btn btn-primary btn-large" href="/portfolio">Portfolio</a> <a className="btn btn-large" href="/contact">Contact</a></p>

    </Default>
  );
};

module.exports = Home;
